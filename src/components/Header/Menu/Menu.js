import React from "react";
import {
  Container,
  Grid,
  Icon,
  Label,
  Menu as Menuweb,
} from "semantic-ui-react";
import { brands } from "../../../helpers/staticData";
import { NavLink } from "react-router-dom";
import { map } from "lodash";
import "./Menu.scss";

export default function Menu() {
  return (
    <div className="menu">
      <Container>
        <Grid>
          <Grid.Column width={6} className="menu__left">
            <MenuPlatforms brands={brands} />
          </Grid.Column>
          <Grid.Column width={10} className="menu__right">
            <MenuOptions />
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
}

function MenuPlatforms({ brands }) {
  return (
    <Menuweb>
      {map(brands, (brand) => (
        <NavLink href={`/games/${brand.url}`} key={brand.id} end>
          <Menuweb.Item name={brand.url}>{brand.title}</Menuweb.Item>
        </NavLink>
      ))}
    </Menuweb>
  );
}

function MenuOptions() {
  return (
    <Menuweb>
      <>
        <NavLink to="/crear" end>
          <Menuweb.Item>
            <Icon name="game" />
            Crear producto
          </Menuweb.Item>
        </NavLink>

        <NavLink to="/cart" end>
          <Menuweb.Item className="m-0">
            <Icon name="cart" />

            <Label color="red" floating circular>
              2
            </Label>
          </Menuweb.Item>
        </NavLink>
      </>
    </Menuweb>
  );
}
