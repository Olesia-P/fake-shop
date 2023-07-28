import { configureStore } from "@reduxjs/toolkit";
import openingsReducer from "./modules/openingsSlice";

export const store = configureStore({
  reducer: {
    openings: openingsReducer,
  },
});
