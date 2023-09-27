import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isMobileMenuOpen: false,
  isCartOpen: false,
};

const openingsSlice = createSlice({
  name: 'openings',
  initialState,
  reducers: {
    changeIsMobileMenuOpen: (state, action) => {
      return {
        ...state,
        isMobileMenuOpen: action.payload,
      };
    },
    changeIsCartOpen: (state, action) => {
      return {
        ...state,
        isCartOpen: action.payload,
      };
    },
  },
});

export default openingsSlice.reducer;
export const { changeIsMobileMenuOpen, changeIsCartOpen } =
  openingsSlice.actions;
