const cart = process.env.REACT_APP_CART;

export function getCart() {
  return localStorage.getItem(cart);
}

export function setCart(cartProduct) {
  localStorage.setItem(cart, cartProduct);
}

export function removeCart() {
  localStorage.removeItem(cart);
}
