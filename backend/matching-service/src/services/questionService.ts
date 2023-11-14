import axios from "axios";

import { DIFFICULTY } from "../utils/enums";

const questionServiceAxiosInstance = axios.create({
  baseURL: process.env.QUESTION_SERVICE,
});

questionServiceAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  },
);

export const getQuestionsByDifficulty = async (d: DIFFICULTY) => {
  const response = await questionServiceAxiosInstance.get(`/questions/${d}/1`);
  return response.data.json();
};
