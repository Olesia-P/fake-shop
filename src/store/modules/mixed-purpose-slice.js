import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  lastOrderId: '',
  searchResults: [],
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
  },
});

export default mixedPurposeSlice.reducer;
export const { changeLastOrderId, changeSearchResults } =
  mixedPurposeSlice.actions;
