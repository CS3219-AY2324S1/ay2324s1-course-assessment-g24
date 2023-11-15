import { Socket } from "socket.io";
import { v4 as uuidv4 } from "uuid";

import { InputOutput } from "..";
import ormController from "../database/ormController";
import { DIFFICULTY, STATUS } from "../utils/enums";
import { timers } from "../utils/timers";
import { getQuestionsByDifficulty } from "../services/questionService";

const matchHandler = {
  matchStart: async (socket: Socket, data: MatchParams) => {
    console.log("match start receivedddd", data);
    const { difficulty, language } = data;
    const queueMembers = await ormController.getAllQueues(
      difficulty,
      language,
      [["createdAt", "ASC"]],
      1,
    );

    if (queueMembers.length > 0) {
      const { id, queueingSocketId } = queueMembers[0];
      clearInterval(timers[id] as NodeJS.Timeout);

      await ormController.deleteQueueById(id);
      if (queueingSocketId == socket.id) return;

      await ormController.createMatch(id, queueingSocketId, socket.id);

      await ormController.updateUserStatusById(
        queueingSocketId,
        STATUS.MATCHED,
      );
      await ormController.updateUserStatusById(socket.id, STATUS.MATCHED);

      socket.join(id);
      const questions = await getQuestionsByDifficulty(difficulty);

      socket.to(queueingSocketId).emit("success", { id, questions });
      socket.emit("success", { id, questions });
    } else {
      const id = uuidv4();

      socket.join(id);

      await ormController.createQueue(id, socket.id, language, difficulty);
      await ormController.updateUserStatusById(socket.id, STATUS.IN_QUEUE);

      const countdownInterval = 1000;
      let ticker = 29;

      const timer = setInterval(() => {
        socket.emit("countdown", ticker);
        if (ticker === 0) clearTimer();
        ticker--;
      }, countdownInterval);

      const clearTimer = async () => {
        clearInterval(timer);
        await ormController.deleteQueueById(id);
        await ormController.updateUserStatusById(socket.id, STATUS.DEFAULT);
        socket.leave(id);
      };

      timers[id] = timer;
    }
  },
  prematureLeave: async (socket: Socket, io: InputOutput) => {
    const leavingSocketId = socket.id;
    const { id, socketIdOne, socketIdTwo } =
      await ormController.getMatchWithMember(leavingSocketId);
    const matchedSocketId =
      socketIdOne !== socket.id ? socketIdOne : socketIdTwo;

    socket.broadcast.to(id).emit("prematureLeave");

    socket.leave(id);
    io.of("/").sockets.get(matchedSocketId)?.leave(id);

    await ormController.updateUserStatusById(leavingSocketId, STATUS.DEFAULT);
    await ormController.updateUserStatusById(matchedSocketId, STATUS.DEFAULT);
    await ormController.deleteMatchById(id);
  },
  properLeave: async (socket: Socket, data: MatchId) => {
    socket.leave(data);
    await ormController.updateUserStatusById(socket.id, STATUS.DEFAULT);
    await ormController.deleteMatchById(data);
  },
  exitQueue: async (socket: Socket) => {
    const queue = await ormController.getQueueBySocketId(socket.id);
    await ormController.deleteQueueByQueueingId(socket.id);
    clearInterval(timers[queue?.id] as NodeJS.Timeout);
  },
  disconnect: async (socket: Socket, io: InputOutput) => {
    const user = await ormController.getUserById(socket.id);

    switch (user.status) {
      case STATUS.IN_QUEUE:
        await matchHandler.exitQueue(socket);
        break;
      case STATUS.MATCHED:
        await matchHandler.prematureLeave(socket, io);
        break;
      default:
        break;
    }

    await ormController.deleteUserById(socket.id);
  },
};

interface MatchParams {
  difficulty: DIFFICULTY;
  language: string;
}

type MatchId = string;

export default matchHandler;
