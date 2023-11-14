import { Match } from "../models/matchModel";
import { Queue, QueueModel } from "../models/queueModel";
import { User } from "../models/userModel";
import { STATUS } from "../utils/enums";

const ormController = {
  getAllQueues: async (difficulty: string, language: string, order: any, limit: number): Promise<Queue[]> => {
    return await QueueModel.findAll({
      where: {
        difficulty, 
        language,
      }, 
      order,
      limit
    }) as unknown as Queue[]
  },
  deleteQueueById: async (queueId: string) => {
    await QueueModel.destroy({
      where: {
        id: queueId
      }
    });
  },
  createMatch: async (id: string, socketIdOne: string, socketIdTwo: string) => {

  },
  updateUserStatusById: async (id: string, status: STATUS) => {

  },
  createQueue: async (id: string, queueingSocketId: string, language: string, difficulty: string) => {

  },
  getMatchWithMember: async (socketId: string) => {
    return { } as Match
  },
  deleteMatchById: async (id: string) => {

  },
  getQueueBySocketId: async (id: string) => {
    return { } as Queue;
  },
  deleteQueueByQueueingId: async (id: string) => {

  },
  getUserById: async (id: string) => {
    return { } as User;
  },
  deleteUserById: async (id: string) => {

  }
}

export default ormController;

