import * as Yup from "yup";

export function initialValues(movil) {
  return {
    title: movil?.title || "",
    miniature: movil?.miniature || "",
    file: null,
    description: movil?.description || "",
    url: movil?.url || "",
    price: movil?.price || undefined,
    score: movil?.score || undefined,
    brand: movil?.brand || undefined,
  };
}

export function validationSchema() {
  return Yup.object({
    title: Yup.string().required(true),
    brand: Yup.string().required(true),
    miniature: Yup.string().required(true),
    description: Yup.string().required(true),
    url: Yup.string().required(true),
    price: Yup.number().required(true),
    score: Yup.number().min(1, true).max(5, true).required(true),
  });
}
