import React from "react";
import useWindowSize from "../../../hooks/useWindowSize";
import "./ListMoviles.scss";
import {
  breakpointUpSm,
  breakpointUpMd,
  breakpointUpLg,
} from "../../../utils/breakpoints";
import { Grid, Image, Pagination } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { map } from "lodash";

export function ListMoviles({ moviles, pagination, setPage, paginate }) {
  const { width } = useWindowSize();

  const changePage = (_, data) => {
    if (paginate) {
      setPage(data.activePage);
    }
  };

  const getColumnsRender = () => {
    switch (true) {
      case width > breakpointUpLg:
        return 5;
      case width > breakpointUpMd:
        return 3;
      case width > breakpointUpSm:
        return 2;
      default:
        return 1;
    }
  };

  return (
    <div className="list-moviles">
      <Grid>
        <Grid.Row columns={getColumnsRender()}>
          {map(moviles, (movil) => (
            <Movil key={movil._id} movil={movil} />
          ))}
        </Grid.Row>
      </Grid>

      {paginate && (
        <div className="list-moviles__pagination">
          <Pagination
            totalPages={pagination.pages}
            defaultActivePage={pagination.page}
            ellipsisItem={null}
            firstItem={null}
            lastItem={null}
            onPageChange={changePage}
          />
        </div>
      )}
    </div>
  );
}

function Movil({ movil }) {
  const formattedPrice =
    movil.price.toLocaleString("es-CO", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) + " COP";
  return (
    <Grid.Column className="list-moviles__movil">
      <div className="list-moviles__movil-poster">
        <NavLink to={`/movil/${movil.url}`} end>
          <Image
            src={`${process.env.REACT_APP_BASE_PATH}/${movil.miniature}`}
            alt={movil.title}
          />
        </NavLink>
        <div className="list-moviles__movil-poster-info">
          <span className="price">{formattedPrice}</span>
        </div>
      </div>
      <h2>{movil.title}</h2>
    </Grid.Column>
  );
}
