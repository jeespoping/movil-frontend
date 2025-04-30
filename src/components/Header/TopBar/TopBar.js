import React from "react";
import { NavLink } from "react-router-dom";
import { Container, Grid, Image, Input } from "semantic-ui-react";
import "./TopBar.scss";

export default function TopBar() {
  return (
    <div className="top-bar">
      <Container>
        <Grid width={8} className="top-bar__left">
          <Grid.Column width={8} className="top-bar__left">
            <Logo />
          </Grid.Column>
          <Grid.Column width={8} className="top-bar__right">
            <Search />
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
}

function Logo() {
  return (
    <NavLink to="/" end>
      <Image src="/logo.png" alt="gaming" />
    </NavLink>
  );
}

function Search() {
  return <Input id="search-game" icon={{ name: "search" }} />;
}
