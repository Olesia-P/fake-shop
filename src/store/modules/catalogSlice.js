import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  catalogProducts: [],
  isJewelery: false,
  isElectronics: false,
  isMensClothing: false,
  isWomensClothing: false,
};

const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {
    changeCatalogProducts: (state, action) => {
      state.catalogProducts = action.payload;
    },
    changeIsJewelery: (state, action) => {
      state.isJewelery = action.payload;
    },
    changeIsElectronics: (state, action) => {
      state.isElectronics = action.payload;
    },
    changeIsMensClothing: (state, action) => {
      state.isMensClothing = action.payload;
    },
    changeIsWomensClothing: (state, action) => {
      state.isWomensClothing = action.payload;
    },
  },
});

export default catalogSlice.reducer;
export const {
  changeCatalogProducts,
  changeIsJewelery,
  changeIsElectronics,
  changeIsMensClothing,
  changeIsWomensClothing,
} = catalogSlice.actions;
