import React from "react";
import "./Crear.scss";
import { Button, Dropdown, Form } from "semantic-ui-react";
import { map } from "lodash";
import { brands } from "../../helpers/staticData";

export default function Crear() {
  const brandsOptions = map(brands, (brand) => ({
    key: brand.id,
    value: brand.id,
    text: brand.title,
  }));

  return (
    <div className="crear">
      <h1 className="crear__title">Crear movil</h1>
      <Form>
        <Form.Input name="title" type="text" placeholder="Titulo" />

        <Form.TextArea name="" placeholder="Descripcion" />

        <Dropdown
          placeholder="Selecciona la marca"
          fluid
          search
          selection
          options={brandsOptions}
        />

        <Button className="submit" type="submit">
          Crear
        </Button>
      </Form>
    </div>
  );
}
