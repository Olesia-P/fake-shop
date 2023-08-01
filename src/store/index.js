import { configureStore } from "@reduxjs/toolkit";
import openingsReducer from "./modules/openingsSlice";
import { fakeShopApi } from "./modules/apiSlice";

export const store = configureStore({
  reducer: {
    openings: openingsReducer,
    [fakeShopApi.reducerPath]: fakeShopApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(fakeShopApi.middleware),
});
