import { AxiosResponse } from "axios";
import { ObjectId } from "bson";

import historyServiceAxiosInstance from "./historyServiceHelper";
import { DIFFICULTY } from "../utils/enums";

// const BASE_URL = import.meta.env.VITE_HISTORY_SERVICE_URL

export const getHistoriesByUser = async (user: User): Promise<History[]> => {
  try {
    const response: AxiosResponse<History[]> =
      await historyServiceAxiosInstance.get("/", {
        data: user,
      });

    return response.data;
  } catch (error) {
    console.error("Error fetching histories by user:", error);
    throw error;
  }
};

export const createHistory = async (history: History): Promise<History> => {
  try {
    const response: AxiosResponse<History> =
      await historyServiceAxiosInstance.post("/", {
        data: history
      });

    return response.data;
  } catch (error) {
    console.error("Error creating history:", error);
    throw error;
  }
};

export const deleteHistoriesByUser = async (user: User): Promise<void> => {
  try {
    await historyServiceAxiosInstance.delete("/", {
      data: user,
    });
  } catch (error) {
    console.error("Error deleting histories by user:", error);
    throw error;
  }
};

interface User {
  email: string;
}

interface History {
  email: string;
  matched_email: string;
  difficulty_level: DIFFICULTY;
  question_title: string;
  question_id: string;
}
