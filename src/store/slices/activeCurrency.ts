import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { api, API_URL_CURRENCIES } from "../../api/api";
import { Currency, CurrencyPair } from "../../types/general";
import { AsyncThunkState } from "../store";

type ActiveCurrencyState = {
  pair: CurrencyPair | undefined;
  data: AsyncThunkState<Currency | unknown>;
};

export const initialState: ActiveCurrencyState = {
  pair: undefined,
  data: {
    isLoading: false,
    data: {},
    error: {},
  },
};

export const fetchCurrency = createAsyncThunk(
  "activeCurrency/fetchCurrency",
  async (address: CurrencyPair["baseAddress"], { rejectWithValue }) => {
    return api
      .post<Currency>(`${API_URL_CURRENCIES}/${address}`)
      .then((response) => response.data)
      .catch((error) => {
        return rejectWithValue(error?.response?.data || error);
      });
  }
);

export const activeCurrencySlice = createSlice({
  name: "activeCurrency",
  initialState,
  reducers: {
    toggleActivePair(state, action: PayloadAction<CurrencyPair | undefined>) {
      state.pair = action.payload;
    },
  },
  extraReducers: {
    [fetchCurrency.pending.type]: (state, action) => {
      state.data = {
        isLoading: true,
        data: [],
        error: {},
      };
    },
    [fetchCurrency.fulfilled.type]: (state, action) => {
      state.data = {
        isLoading: false,
        data: action.payload,
        error: {},
      };
    },
    [fetchCurrency.rejected.type]: (state, action) => {
      state.data = {
        isLoading: false,
        data: [],
        error: action.payload,
      };
    },
  },
});

export const selectActivePair = (state: RootState) => state.activeCurrency.pair;
export const selectActivePairData = (state: RootState) =>
  state.activeCurrency.data;
export const { toggleActivePair } = activeCurrencySlice.actions;
