import React, { useEffect, useState } from "react";
import { removeProductCart as removeProductCartLocal } from "../../../api/cart";
import { useDispatch } from "react-redux";
import { filter, find, forEach, map } from "lodash";
import "./SummaryCart.scss";
import { Icon, Image, Table } from "semantic-ui-react";
import { brands } from "../../../helpers/staticData";
import { removeProductCart } from "../../../reducers/cartReducer";

export default function SummaryCart({ products, reloadCart, setReloadCart }) {
  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useDispatch();

  const getBrand = (id) => {
    const dataFind = find(brands, { id: parseInt(id) });

    return dataFind?.title;
  };

  useEffect(() => {
    let price = 0;

    forEach(products, (product) => {
      price += product.price;
    });
    setTotalPrice(price);
  }, [reloadCart, products]);

  const removeProduct = (product) => {
    removeProductCartLocal(product);

    dispatch(removeProductCart({ product }));
    setReloadCart(true);
  };

  return (
    <div className="summary-cart">
      <div className="title">Resumen del carrito</div>

      <div className="data">
        <Table celled structured>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Producto</Table.HeaderCell>
              <Table.HeaderCell>Marca</Table.HeaderCell>
              <Table.HeaderCell>Entrega</Table.HeaderCell>
              <Table.HeaderCell>Precio</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {map(products, (product) => (
              <Table.Row key={product._id} className="summary-cart__product">
                <Table.Cell>
                  <Icon
                    name="close"
                    link
                    onClick={() => removeProduct(product.url)}
                  />
                  <Image
                    src={`${process.env.REACT_APP_BASE_PATH}/${product.miniature}`}
                    alt={product.title}
                  />
                  {product.title}
                </Table.Cell>
                <Table.Cell>{getBrand(product.brand)}</Table.Cell>
                <Table.Cell>Inmediata</Table.Cell>
                <Table.Cell>
                  {product.price.toLocaleString("es-CO", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }) + " COP"}
                </Table.Cell>
              </Table.Row>
            ))}

            <Table.Row className="summary-cart__resume">
              <Table.Cell className="clear"></Table.Cell>
              <Table.Cell colSpan="2">Total:</Table.Cell>
              <Table.Cell className="total-price">
                {totalPrice.toLocaleString("es-CO", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }) + " COP"}
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}
