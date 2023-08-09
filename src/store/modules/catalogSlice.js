import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  catalogCategory: "",
};

const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {
    changeCatalogCategory: (state, action) => {
      state.catalogCategory = action.payload;
    },
  },
});

export default catalogSlice.reducer;
export const { changeCatalogCategory } = catalogSlice.actions;