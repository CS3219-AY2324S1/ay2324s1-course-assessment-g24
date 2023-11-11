import axios from "axios";

const historyServiceAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_HISTORY_SERVICE_URL,
});

historyServiceAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  },
);

export default historyServiceAxiosInstance;
