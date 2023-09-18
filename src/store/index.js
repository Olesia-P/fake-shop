import { configureStore } from "@reduxjs/toolkit";
import openingsReducer from "./modules/openingsSlice";
import { fakeShopApi } from "./modules/apiSlice";
import catalogReducer from "./modules/catalogSlice";
import lastOrderIdReducer from "./modules/lastOrderIdSlice";
// import cartReducer from "./modules/cartSlice";
import { localFakeShopApi } from "./modules/localApiSlice";

export const store = configureStore({
  reducer: {
    openings: openingsReducer,
    [fakeShopApi.reducerPath]: fakeShopApi.reducer,
    [localFakeShopApi.reducerPath]: localFakeShopApi.reducer,
    catalog: catalogReducer,
    // cart: cartReducer,
    lastOrderId: lastOrderIdReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(fakeShopApi.middleware)
      .concat(localFakeShopApi.middleware),
});
