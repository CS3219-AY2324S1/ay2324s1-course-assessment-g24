import axios from "axios";

type QuestionCrudRepo = {
  qid: number,
  title: string;
  topic: string;
  difficulty_level: string;
  question_description: string;
};

const questionServiceAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_QUESTION_SERVICE_URL,
});

const questionServiceCrudAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_QUESTION_SERVICE_CRUD_URL,
});

questionServiceAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  },
);

questionServiceCrudAxiosInstance.interceptors.response.use(
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

// Assignment 2b related apis
export const getCrudQuestions = async () => {
  const response = await questionServiceCrudAxiosInstance.get(`/`);
  return response.data;
};

export const deleteCrudQuestion = async (qid: number) => {
  const response = await questionServiceCrudAxiosInstance.delete(`/${qid}`);
  return response.data;
};

export const createCrudQuestion = async (questionRepo: QuestionCrudRepo) => {
  const response = await questionServiceCrudAxiosInstance.post('/', questionRepo);
  return response.data;
};

export const updateCrudQuestion = async (qid: number, questionRepo: QuestionCrudRepo) => {
  const response = await questionServiceCrudAxiosInstance.put(`/${qid}`, questionRepo);
  return response.data;
};

export default questionServiceAxiosInstance;
