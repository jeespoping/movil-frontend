import { httpConToken, httpConTokenImage, httpSinToken } from "../helpers/http";

export const getMoviles = async () => {
  try {
    const { data } = await httpSinToken("/movil");

    return data;
  } catch (error) {
    console.log(error);

    return null;
  }
};

export const getMovil = async (url) => {
  try {
    const { data } = await httpSinToken(`/movil/${url}`);

    return data;
  } catch (error) {
    console.log(error);

    return null;
  }
};

export const searchMovil = async (q) => {
  try {
    const { data } = await httpSinToken(`/movil/search?q=${q}`);

    return data;
  } catch (error) {
    console.log(error);

    return null;
  }
};

export const createMovil = async (formValue) => {
  try {
    const formData = new FormData();
    Object.keys(formValue).forEach((key) => {
      formData.append(key, formValue[key]);
    });

    if (formValue.file) {
      formData.append("miniature", formValue.file);
    }

    const { data } = await httpConTokenImage.post("/movil", formData);

    return data;
  } catch (error) {
    console.log(error);

    return null;
  }
};

export const deleteMovil = async (idMovil) => {
  try {
    const { data } = await httpConToken.delete(`/movil/${idMovil}`);

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
