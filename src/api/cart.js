import { toast } from "react-toastify";
import { getCart, removeCart, setCart } from "../utils/cart";
import { includes, remove, size } from "lodash";

export function getProductsCart() {
  const cart = getCart();

  if (!cart) {
    return null;
  } else {
    const products = cart.split(",");
    return products;
  }
}

export function addProductCart(product) {
  const cart = getProductsCart();

  if (!cart) {
    setCart(product);
    toast.success("Producto añadido al carrito");
  } else {
    const productFound = includes(cart, product);
    if (productFound) {
      toast.warning("Este producto ya esta en el carrito");
    } else {
      cart.push(product);

      setCart(cart);
      toast.success("Producto añadido Correctamente");
    }
  }
}

export function countProductsCart() {
  const cart = getProductsCart();

  if (!cart) {
    return 0;
  } else {
    return size(cart);
  }
}

export function removeProductCart(product) {
  const cart = getProductsCart();

  remove(cart, (item) => {
    return item === product;
  });

  if (size(cart) > 0) {
    setCart(cart);
  } else {
    removeCart();
  }
}

export async function removeAllProductsCart() {
  const cart = process.env.REACT_APP_CART;
  removeCart();
}
