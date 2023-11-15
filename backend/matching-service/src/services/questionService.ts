import axios from "axios";

import { DIFFICULTY } from "../utils/enums";

const questionServiceAxiosInstance = axios.create({
  baseURL: "http://localhost:8010",
  headers: {
    "Content-Type": "application/json"
  }
});

questionServiceAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  },
);

export const getQuestionsByDifficulty = async (d: DIFFICULTY) => {
  const response = await questionServiceAxiosInstance.post(`/questions/${d}/1`);
  return response.data
};

