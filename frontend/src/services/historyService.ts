import { AxiosResponse } from "axios";
import { ObjectId } from "bson";

import historyServiceAxiosInstance from "./historyServiceHelper";

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
      await historyServiceAxiosInstance.post("/", history, {});

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
  difficulty_level: string;
  question_title: string;
  question_id: ObjectId;
}
