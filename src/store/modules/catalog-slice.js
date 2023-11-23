import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  catalogCategory: '',
  catalogFilters: { alphabet: 'asc', limit: '20' },
};

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    changeCatalogCategory: (state, action) => {
      return {
        ...state,
        catalogCategory: action.payload,
      };
    },
    changeCatalogFilters: (state, action) => {
      return {
        ...state,
        catalogFilters: action.payload,
      };
    },
  },
});

export default catalogSlice.reducer;
export const { changeCatalogCategory, changeCatalogFilters } =
  catalogSlice.actions;
