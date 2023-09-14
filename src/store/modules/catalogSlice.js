import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  catalogCategory: "",
  catalogFilters: { alphabet: "asc", limit: "20" },
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
    changeCatalogFiltersLimit: (state, action) => {
      state.catalogFilters.limit = action.payload;
    },
  },
});

export default catalogSlice.reducer;
export const {
  changeCatalogCategory,
  changeCatalogFiltersAlph,
  changeCatalogFiltersLimit,
} = catalogSlice.actions;
