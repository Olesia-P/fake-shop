import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  lastOrderId: '',
  searchResults: [],
  userId: null,
  isCartCreated: false,
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
    changeSearchResults: (state, action) => {
      return {
        ...state,
        searchResults: action.payload,
      };
    },
    changeUserId: (state, action) => {
      return {
        ...state,
        userId: action.payload,
      };
    },
    changeIsCartCreated: (state, action) => {
      return {
        ...state,
        isCartCreated: action.payload,
      };
    },
  },
});

export default mixedPurposeSlice.reducer;
export const {
  changeLastOrderId,
  changeSearchResults,
  changeUserId,
  changeIsCartCreated,
} = mixedPurposeSlice.actions;
