import React from "react";
import "./HeaderMovil.scss";
import { Button, Grid, Image, Rating } from "semantic-ui-react";
import { addProductCart as addProductCartLocal } from "../../../api/cart";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addProductCart } from "../../../reducers/cartReducer";

export function HeaderMovil({ movil }) {
  return (
    <Grid className="header-movil">
      <Grid.Column mobile={16} tablet={6} computer={5}>
        <Image src={product.miniature} alt={movil.title} fluid />
      </Grid.Column>
      <Grid.Column mobile={16} tablet={10} computer={11}>
        <Info movil={movil} />
      </Grid.Column>
    </Grid>
  );
}

function Info({ movil }) {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const addProduct = (product) => {
    if (isAuthenticated) {
      addProductCartLocal(product);
      dispatch(addProductCart({ product }));
    } else {
      toast.warning("Para comprar un movil tienes que iniciar sesión");
    }
  };

  const formattedPrice =
    movil.price.toLocaleString("es-CO", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) + " COP";

  return (
    <>
      <div className="header-movil__title">{movil.title}</div>
      <Rating icon="star" defaultRating={movil.score} maxRating={5} />
      <div className="header-movil__delivery">Entrega en 24/48h</div>
      <div
        className="header-movil__summary"
        dangerouslySetInnerHTML={{ __html: movil.description }}
      />
      <div className="header-movil__buy">
        <div className="header-movil__buy-price">
          <p>Precio de venta al publico: {movil.price}€</p>
          <div className="header-movil__buy-price-actions">
            <p>{formattedPrice} COP</p>
          </div>
        </div>
        <Button
          onClick={() => addProduct(movil.url)}
          className="header-movil__buy-btn"
        >
          Comprar
        </Button>
      </div>
    </>
  );
}
