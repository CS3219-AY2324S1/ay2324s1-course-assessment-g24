import userServiceAxiosInstance from "../services/userService";

export const setSession = (
  accessToken: string | null,
  refreshToken: string | null = null,
) => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
    userServiceAxiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem("accessToken");
    delete userServiceAxiosInstance.defaults.headers.common["Authorization"];
  }
  if (refreshToken) {
    localStorage.setItem("refreshToken", refreshToken);
  }
};

export const resetSession = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  delete userServiceAxiosInstance.defaults.headers.common["Authorization"];
};
