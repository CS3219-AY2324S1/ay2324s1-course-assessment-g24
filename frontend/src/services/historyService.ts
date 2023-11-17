import { AxiosResponse } from "axios";

import historyServiceAxiosInstance from "./historyServiceHelper";
import { DIFFICULTY } from "../utils/enums";

export const getHistoriesByUser = async (user: User): Promise<History[]> => {
  try {
    const response: AxiosResponse<History[]> =
    await historyServiceAxiosInstance.get("/history", {
      params: {
        email: user.email
      },
    });

    if ("histories" in response.data) {
      return response.data.histories as unknown as History[];
    }

    return [];
  } catch (error) {
    console.error("Error fetching histories by user:", error);
    throw error;
  }
};

export const createHistory = async (history: History): Promise<History> => {
  try {
    const response: AxiosResponse<History> =
      await historyServiceAxiosInstance.post("/history", {
        params: {
          email: history.email,
          matched_email: history.matched_email,
          difficulty_level: history.difficulty_level,
          question_title: history.question_title,
          question_id: history.question_id,
        }
      });

    return response.data;
  } catch (error) {
    console.error("Error creating history:", error);
    throw error;
  }
};

export const deleteHistoriesByUser = async (user: User): Promise<void> => {
  try {
    await historyServiceAxiosInstance.delete("/history", {
      params: {
        email: user.email
      },
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
