import { JwtPayload, jwtDecode } from "jwt-decode";

export const validateToken = (token: string) => {
  const now = Math.round(new Date().getTime() / 1000);
  const decodedToken = jwtDecode<JwtPayload>(token);

  if (decodedToken?.exp) {
    return now < decodedToken.exp;
  }

  return false;
};
