import axios from "axios";

const questionServiceAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_QUESTION_SERVICE_URL,
});

questionServiceAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  },
);

export const getAllQuestions = async () => {
  const response = await questionServiceAxiosInstance.get(`/`);
  return response.data;
};

export const updateUpvote = async (title: string) => {
  const response = await questionServiceAxiosInstance.post(`/popular/upvote/${title}`);
  return response.data;
};

export const updateDownvote = async (title: string) => {
  const response = await questionServiceAxiosInstance.post(`/popular/downvote/${title}`);
  return response.data;
};

export const fetchQuestion = async (title: string) => {
  const response = await questionServiceAxiosInstance.get(`/title/${title}`);
  return response.data;
};

export default questionServiceAxiosInstance;
