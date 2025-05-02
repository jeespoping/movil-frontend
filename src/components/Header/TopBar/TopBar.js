import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Image,
  Search as SearchInput,
} from "semantic-ui-react";
import "./TopBar.scss";
import { searchMovil } from "../../../api/movil";
import { map, size } from "lodash";

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
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [value, setValue] = useState("");

  const navigate = useNavigate();

  const handleSearchChange = async (e, data) => {
    setLoading(true);
    const response = await searchMovil(data.value);
    if (size(response) > 0)
      setResults(
        map(response.docs, (movil) => ({
          title: movil.title,
          price:
            movil.price.toLocaleString("es-CO", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }) + " COP",
          image: movil.miniature,
          url: movil.url,
        }))
      );
    else setResults([]);
    setValue(data.value);
    setLoading(false);
  };

  return (
    <SearchInput
      results={results}
      value={value}
      onSearchChange={handleSearchChange}
      placeholder="Search..."
      loading={loading}
      onResultSelect={(e, data) => navigate(`/movil/${data.result.url}`)}
    />
  );
}
