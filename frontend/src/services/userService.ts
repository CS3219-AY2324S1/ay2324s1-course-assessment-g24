import axios from "axios";

const userServiceAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_USER_SERVICE_URL,
});

userServiceAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  },
);

export default userServiceAxiosInstance;
