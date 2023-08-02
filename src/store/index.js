import { configureStore } from "@reduxjs/toolkit";
import openingsReducer from "./modules/openingsSlice";
import { fakeShopApi } from "./modules/apiSlice";
import catalogReducer from "./modules/catalogSlice";

export const store = configureStore({
  reducer: {
    openings: openingsReducer,
    [fakeShopApi.reducerPath]: fakeShopApi.reducer,
    catalog: catalogReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(fakeShopApi.middleware),
});
