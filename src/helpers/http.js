import axios from "axios";
import { getAccesToken } from "../utils/token";

const baseURL = process.env.REACT_APP_API_URL;

const httpSinToken = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

const httpConToken = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getAccesToken()}`,
  },
});

const httpConTokenImage = axios.create({
  baseURL,
  headers: {
    "Content-type": "multipart/form-data",
    Authorization: `Bearer ${getAccesToken()}`,
  },
});

export { httpSinToken, httpConToken, httpConTokenImage };
