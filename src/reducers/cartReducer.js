import { createSlice } from "@reduxjs/toolkit";
import { includes, remove, size } from "lodash";

const initialState = {
  cart: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductCart: (state, action) => {
      if (!state.cart) {
        state.cart = action.payload.product;
      } else {
        const productFound = includes(
          state.cart.split(","),
          action.payload.product
        );
        if (!productFound) {
          state.cart = `${state.cart},${action.payload.product}`;
        }
      }
    },
    removeProductCart: (state, action) => {
      if (!state.cart) {
        state.cart = null;
      } else {
        const products = state.cart.split(",");

        remove(products, (item) => {
          return item === action.payload.product;
        });

        if (size(products) > 0) {
          state.cart = products.join(",");
        } else {
          state.cart = null;
        }
      }
    },
  },
});

export const { addProductCart, removeProductCart } = cartSlice.actions;
export default cartSlice.reducer;
