import React, { useEffect, useState } from "react";
import { getProductsCart } from "../../api/cart";
import "./Cart.scss";
import { getMovil } from "../../api/movil";
import SummaryCart from "../../components/Cart/SummaryCart";
import { useSelector } from "react-redux";

export default function Cart() {
  const { cart } = useSelector((state) => state.cart);
  const products = cart?.split(",");

  return (
    <div className="cart">
      {!products ? (
        <h2>No hay productos en el carrito</h2>
      ) : (
        <FullCart products={products} />
      )}
    </div>
  );
}

function FullCart({ products }) {
  const [productsData, setProductsData] = useState(null);
  const [reloadCart, setReloadCart] = useState(false);

  useEffect(() => {
    (async () => {
      const productsTemp = [];
      for await (const product of products) {
        const data = await getMovil(product);
        productsTemp.push(data);
      }
      setProductsData(productsTemp);
    })();
    setReloadCart(false);
  }, [reloadCart]);

  return (
    <>
      <SummaryCart
        reloadCart={reloadCart}
        setReloadCart={setReloadCart}
        products={productsData}
      />
    </>
  );
}
