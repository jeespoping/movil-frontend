import { toast } from "react-toastify";
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

export const register = async (formData) => {
  try {
    const { data } = await httpSinToken.post("/auth/register", formData);

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return null;
  }
};

export const login = async (formData) => {
  try {
    const { data } = await httpSinToken.post("/auth/login", formData);

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return null;
  }
};
