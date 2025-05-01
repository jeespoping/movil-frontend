import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Form } from "semantic-ui-react";
import "../LoginForm/LoginForm.scss";

export default function RegisterForm({ showLoginForm }) {
  const formik = useFormik({
    initialValues: initialValue(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      console.log(formData);
    },
  });

  return (
    <Form className="login-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="fisrtname"
        type="text"
        placeholder="Nombre"
        onChange={formik.handleChange}
        error={formik.errors.fisrtname}
      />
      <Form.Input
        name="lastname"
        type="text"
        placeholder="Apellidos"
        onChange={formik.handleChange}
        error={formik.errors.lastname}
      />
      <Form.Input
        name="email"
        type="text"
        placeholder="Correo electronico"
        onChange={formik.handleChange}
        error={formik.errors.email}
      />
      <Form.Input
        name="password"
        type="password"
        placeholder="Contraseña"
        onChange={formik.handleChange}
        error={formik.errors.password}
      />

      <div className="actions">
        <Button onClick={showLoginForm} type="button">
          Iniciar sesion
        </Button>
        <Button className="submit" type="submit">
          Registrar
        </Button>
      </div>
    </Form>
  );
}

function initialValue() {
  return {
    fisrtname: "",
    lastname: "",
    email: "",
    password: "",
  };
}

function validationSchema() {
  return {
    fisrtname: Yup.string().required(true),
    lastname: Yup.string().required(true),
    email: Yup.string().email(true).required(true),
    password: Yup.string().required(true),
  };
}
