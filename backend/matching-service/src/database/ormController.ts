import { Op } from "sequelize";

import { Match, MatchModel } from "../models/matchModel";
import { Queue, QueueModel } from "../models/queueModel";
import { User, UserModel } from "../models/userModel";
import { STATUS } from "../utils/enums";

const ormController = {
  getAllQueues: async (
    difficulty: string,
    language: string,
    order: any,
    limit: number,
  ): Promise<Queue[]> => {
    return (await QueueModel.findAll({
      where: {
        difficulty,
        language,
      },
      order,
      limit,
    })) as unknown as Queue[];
  },
  deleteQueueById: async (queueId: string) => {
    await QueueModel.destroy({
      where: {
        id: queueId,
      },
    });
  },
  createMatch: async (
    matchId: string,
    socketIdOne: string,
    socketIdTwo: string,
  ) => {
    await MatchModel.create({
      id: matchId,
      socketIdOne,
      socketIdTwo,
    });
  },
  updateUserStatusById: async (userId: string, status: STATUS) => {
    await UserModel.update(
      { status: status },
      {
        where: {
          socketId: userId,
        },
      },
    );
  },
  createQueue: async (
    id: string,
    queueingSocketId: string,
    language: string,
    difficulty: string,
  ) => {
    await QueueModel.create({
      id,
      queueingSocketId,
      difficulty,
      language,
    });
  },
  getMatchWithMember: async (socketId: string) => {
    return (await MatchModel.findOne({
      where: {
        [Op.or]: [
          {
            socketIdOne: socketId,
          },
          {
            socketIdTwo: socketId,
          },
        ],
      },
    })) as unknown as Match;
  },
  deleteMatchById: async (id: string) => {
    await MatchModel.destroy({
      where: {
        id,
      },
    });
  },
  getQueueBySocketId: async (id: string) => {
    return QueueModel.findOne({
      where: {
        id,
      },
    }) as unknown as Queue;
  },
  deleteQueueByQueueingId: async (id: string) => {
    await QueueModel.destroy({
      where: {
        id,
      },
    });
  },
  getUserById: async (id: string) => {
    return (await UserModel.findOne({
      where: {
        id,
      },
    })) as unknown as User;
  },
  deleteUserById: async (id: string) => {
    await UserModel.destroy({
      where: {
        id,
      },
    });
  },
};

export default ormController;
