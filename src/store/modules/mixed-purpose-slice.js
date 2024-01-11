import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  lastOrderId: '',
  searchResults: [],
  userId: null,
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
  },
});

export default mixedPurposeSlice.reducer;
export const { changeLastOrderId, changeSearchResults, changeUserId } =
  mixedPurposeSlice.actions;
