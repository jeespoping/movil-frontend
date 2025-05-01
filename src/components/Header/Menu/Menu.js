import React, { useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../reducers/authReducer";
import ModalBasic from "../../ModalBasic";
import Auth from "../../Auth/Auth";

export default function Menu() {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("Iniciar sesion");

  const onShowModal = () => setShowModal(true);
  const onCloseModal = () => setShowModal(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="menu">
      <Container>
        <Grid>
          <Grid.Column width={6} className="menu__left">
            <MenuPlatforms brands={brands} />
          </Grid.Column>
          <Grid.Column width={10} className="menu__right">
            <MenuOptions
              onShowModal={onShowModal}
              user={user}
              handleLogout={handleLogout}
            />
          </Grid.Column>
        </Grid>
      </Container>
      <ModalBasic
        size="small"
        show={showModal}
        setShow={setShowModal}
        title={titleModal}
      >
        <Auth setTitleModal={setTitleModal} onCloseModal={onCloseModal} />
      </ModalBasic>
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

function MenuOptions({ user, onShowModal, handleLogout }) {
  return (
    <Menuweb>
      <>
        {user ? (
          <>
            {user.role === "admin" && (
              <>
                <NavLink to="/crear" end>
                  <Menuweb.Item>
                    <Icon name="game" />
                    Crear producto
                  </Menuweb.Item>
                </NavLink>
              </>
            )}

            <NavLink to="/cart" end>
              <Menuweb.Item className="m-0">
                <Icon name="cart" />

                <Label color="red" floating circular>
                  2
                </Label>
              </Menuweb.Item>
            </NavLink>

            <Menuweb.Item className="m-0" onClick={handleLogout}>
              <Icon name="power off" />
            </Menuweb.Item>
          </>
        ) : (
          <Menuweb.Item onClick={onShowModal}>
            <Icon name="user outline" />
            Mi cuenta
          </Menuweb.Item>
        )}
      </>
    </Menuweb>
  );
}
