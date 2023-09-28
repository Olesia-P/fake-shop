import { configureStore } from '@reduxjs/toolkit';
import openingsReducer from './modules/openings-slice';
import { fakeShopApi } from './modules/api-slice';
import catalogReducer from './modules/catalog-slice';
import mixedPurposeSliceReducer from './modules/mixed-purpose-slice';
import { localFakeShopApi } from './modules/local-api-slice';

export const store = configureStore({
  reducer: {
    openings: openingsReducer,
    [fakeShopApi.reducerPath]: fakeShopApi.reducer,
    [localFakeShopApi.reducerPath]: localFakeShopApi.reducer,
    catalog: catalogReducer,
    mixedPurpose: mixedPurposeSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(fakeShopApi.middleware)
      .concat(localFakeShopApi.middleware),
});
