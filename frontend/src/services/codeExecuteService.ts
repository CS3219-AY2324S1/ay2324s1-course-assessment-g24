import axios from "axios";

const codeExecutionService = axios.create({
  baseURL: "http://localhost:5001", // Set your base URL here
});

codeExecutionService.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  },
);

export const getCodeExecutionOutput = async (editorValue: string, language: string | undefined) => {
    const response = await codeExecutionService.post("/execute", {
      code: editorValue,
      language: language?.toLowerCase(),
    });
    return response;
};

export default codeExecutionService;
