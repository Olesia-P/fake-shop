import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMobileMenuOpen: false,
};

const openingsSlice = createSlice({
  name: "openings",
  initialState,
  reducers: {
    changeIsMobileMenuOpen: (state, action) => {
      state.isMobileMenuOpen = action.payload;
    },
  },
});

export default openingsSlice.reducer;
export const { changeIsMobileMenuOpen } = openingsSlice.actions;
