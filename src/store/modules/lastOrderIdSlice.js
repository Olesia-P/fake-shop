import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lastOrderId: "",
};

const lastOrderIdSlice = createSlice({
  name: "lastOrderId",
  initialState,
  reducers: {
    changeLastOrderId: (state, action) => {
      state.lastOrderId = action.payload;
    },
  },
});

export default lastOrderIdSlice.reducer;
export const { changeLastOrderId } = lastOrderIdSlice.actions;
