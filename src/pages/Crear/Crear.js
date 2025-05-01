import React, { useCallback } from "react";
import "./Crear.scss";
import { Button, Dropdown, Form, Image } from "semantic-ui-react";
import { map } from "lodash";
import { brands } from "../../helpers/staticData";
import { useDropzone } from "react-dropzone";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./CrearForm.form";

export default function Crear({ course }) {
  const formik = useFormik({
    initialValues: initialValues(course),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      console.log(formValue);
    },
  });

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    formik.setFieldValue("miniature", URL.createObjectURL(file));
    formik.setFieldValue("file", file);
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    onDrop,
  });

  const getMiniature = () => {
    if (formik.values.file) {
      return formik.values.miniature;
    } else if (formik.values.miniature) {
      return `${process.env.REACT_APP_BASE_PATH}/${formik.values.miniature}`;
    }
    return null;
  };

  const brandsOptions = map(brands, (brand) => ({
    key: brand.id,
    value: brand.id,
    text: brand.title,
  }));

  return (
    <div className="crear">
      <h1 className="crear__title">Crear movil</h1>
      <Form className="movil-form" onSubmit={formik.handleSubmit}>
        <div className="movil-form__miniature" {...getRootProps()}>
          <input {...getInputProps()} />
          {getMiniature() ? (
            <Image size="small" src={getMiniature()} />
          ) : (
            <div>
              <span>Arrastra tu miniatura</span>
            </div>
          )}
        </div>

        <Form.Input
          name="title"
          type="text"
          placeholder="Titulo"
          onChange={formik.handleChange}
          value={formik.values.title}
          error={formik.errors.title}
        />

        <Form.Input
          name="url"
          placeholder="Link del movil"
          onChange={formik.handleChange}
          value={formik.values.url}
          error={formik.errors.url}
        />

        <Form.TextArea
          name="description"
          placeholder="Descripcion"
          onChange={formik.handleChange}
          value={formik.values.description}
          error={formik.errors.description}
        />

        <Form.Input
          type="number"
          name="price"
          placeholder="Precio del movil"
          onChange={formik.handleChange}
          value={formik.values.price}
          error={formik.errors.price}
        />
        <Form.Input
          type="number"
          name="score"
          placeholder="Puntuacion del movil"
          onChange={formik.handleChange}
          value={formik.values.score}
          error={formik.errors.score}
        />

        <Dropdown
          placeholder="Selecciona la marca"
          fluid
          search
          selection
          options={brandsOptions}
          defaultValue={formik.values.brand}
          onChange={(_, data) => formik.setFieldValue("brand", data.value)}
          error={formik.errors.brand}
        />

        <Button className="submit" type="submit">
          Crear
        </Button>
      </Form>
    </div>
  );
}
