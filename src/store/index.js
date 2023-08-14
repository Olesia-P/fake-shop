import { configureStore } from "@reduxjs/toolkit";
import openingsReducer from "./modules/openingsSlice";
import { fakeShopApi } from "./modules/apiSlice";
import catalogReducer from "./modules/catalogSlice";
import cartReducer from "./modules/cartSlice";

export const store = configureStore({
  reducer: {
    openings: openingsReducer,
    [fakeShopApi.reducerPath]: fakeShopApi.reducer,
    catalog: catalogReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(fakeShopApi.middleware),
});
