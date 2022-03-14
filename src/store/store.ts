import { configureStore } from "@reduxjs/toolkit";
import { catalogSlice } from "./slices/catalog";
import { activeCurrencySlice } from "./slices/activeCurrency";

export const store = configureStore({
  reducer: {
    catalog: catalogSlice.reducer,
    activeCurrency: activeCurrencySlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AsyncThunkState<T> = {
  isLoading: boolean;
  data: T;
  error: {
    message?: string;
  };
};
