import { httpConToken } from "../helpers/http";

export const getMoviles = async () => {
  try {
    const { data } = await httpConToken("/movil");

    return data;
  } catch (error) {
    console.log(error);

    return null;
  }
};
