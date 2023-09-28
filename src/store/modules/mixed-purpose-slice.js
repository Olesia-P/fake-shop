import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  lastOrderId: '',
};

const mixedPurposeSlice = createSlice({
  name: 'mixedPurpose',
  initialState,
  reducers: {
    changeLastOrderId: (state, action) => {
      return {
        ...state,
        lastOrderId: action.payload,
      };
    },
  },
});

export default mixedPurposeSlice.reducer;
export const { changeLastOrderId } = mixedPurposeSlice.actions;
