import { createSlice } from "@reduxjs/toolkit";

const initialState = { cartProducts: [] };

// {product:
// quantity:
// }

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const identicalObject = state.cartProducts.find(
        (it) => it.product.id === action.payload.id
      );
      action.payload.id === identicalObject?.product.id
        ? (state.cartProducts.find(
            (it) => it.product.id === action.payload.id
          ).quantity = identicalObject.quantity + 1)
        : state.cartProducts.push({
            product: action.payload,
            quantity: 1,
          });
    },
    deleteFromCart: (state, action) => {
      const receivedId = action.payload;
      const newCart = state.cartProducts.filter(
        (it) => it.product.id !== receivedId
      );
      state.cartProducts = newCart;
    },

    plusToQuantity: (state, action) => {
      const receivedId = action.payload;
      state.cartProducts.find((it) => it.product.id === receivedId).quantity =
        state.cartProducts.find((it) => it.product.id === receivedId).quantity +
        1;
    },
    minusToQuantity: (state, action) => {
      const receivedId = action.payload;
      state.cartProducts.find((it) => it.product.id === receivedId).quantity > 1
        ? (state.cartProducts.find(
            (it) => it.product.id === receivedId
          ).quantity =
            state.cartProducts.find((it) => it.product.id === receivedId)
              .quantity - 1)
        : 1;
    },
  },
});

export default cartSlice.reducer;
export const {
  addToCart,
  deleteFromCart,
  plusToQuantity,
  minusToQuantity,
  updateProductCost,
  countCost,
} = cartSlice.actions;
