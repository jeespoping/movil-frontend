import { httpConToken, httpSinToken } from "../helpers/http";

export const refreshAccessToken = async (refreshToken) => {
  try {
    const { data } = await httpSinToken.post("/auth/refresh_access_token", {
      token: refreshToken,
    });

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const loginByToken = async () => {
  try {
    const { data } = await httpConToken("/auth/me");

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
