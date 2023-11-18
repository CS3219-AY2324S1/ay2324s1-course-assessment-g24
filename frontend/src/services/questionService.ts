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

export const getAllQuestions =  async () => {
  const response = await questionServiceAxiosInstance.get(`/`);
  console.log(response?.data)
  return response.data;
};

export const incrementUpvote = async (title: string) => {
  const response = await questionServiceAxiosInstance.post(`/popular/upvote/${title}`);
  return response.data;
};

export const decrementUpvote = async (title: string) => {
  const response = await questionServiceAxiosInstance.post(`/popular/reduce/upvote/${title}`);
  return response.data;
};

export const incrementDownvote = async (title: string) => {
  const response = await questionServiceAxiosInstance.post(`/popular/downvote/${title}`);
  return response.data;
};

export const decrementDownvote = async (title: string) => {
  const response = await questionServiceAxiosInstance.post(`/popular/reduce/downvote/${title}`);
  return response.data;
};

export const fetchQuestion = async (title: string) => {
  const response = await questionServiceAxiosInstance.get(`/title/${title}`);
  return response.data;
};

export const addLeetCodeQuestion = async (leetcodeQuestion: string) => {
  try {
    const response = await questionServiceAxiosInstance.post(`/add/${leetcodeQuestion}`);
    return response.data;
  } catch (error) {
    console.error(`An error occurred: ${error}`);
    throw error;
  }
};

export default questionServiceAxiosInstance;