import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  catalogCategory: "",
  catalogFilters: { alphabet: "asc", limit: "" },
};

const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {
    changeCatalogCategory: (state, action) => {
      state.catalogCategory = action.payload;
    },
    changeCatalogFiltersAlph: (state, action) => {
      state.catalogFilters.alphabet = action.payload;
    },
  },
});

export default catalogSlice.reducer;
export const { changeCatalogCategory, changeCatalogFiltersAlph } =
  catalogSlice.actions;
