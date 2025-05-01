import { jwtDecode } from "jwt-decode";

const access = process.env.REACT_APP_ACCESS;
const refresh = process.env.REACT_APP_REFRESH;

export function setAccesToken(token) {
  localStorage.setItem(access, token);
}

export function getAccesToken() {
  return localStorage.getItem(access);
}

export function setRefreshToken(token) {
  localStorage.setItem(refresh, token);
}

export function getRefreshToken() {
  return localStorage.getItem(refresh);
}

export const hasExpiredToken = (token) => {
  const { exp } = jwtDecode(token);
  const currentData = new Date().getTime();

  if (exp <= currentData) {
    return true;
  }

  return false;
};
