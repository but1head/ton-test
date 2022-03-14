import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { api, API_URL_CURRENCY_PAIRS_META } from "../../api/api";
import { AsyncThunkState } from "../store";
import { CurrencyPair } from "../../types/general";

type CatalogState = {
  currencyPairs: AsyncThunkState<CurrencyPair[]>;
  favoritePairs: string[];
};

export const initialState: CatalogState = {
  currencyPairs: {
    isLoading: false,
    data: [],
    error: {},
  },
  favoritePairs: [],
};

export const fetchCurrencyPairs = createAsyncThunk(
  "catalog/fetchCurrencyPairs",
  async (_, { rejectWithValue }) => {
    return api
      .get<CurrencyPair[]>(API_URL_CURRENCY_PAIRS_META)
      .then((response) => {
        // фильтр по */USDT (в задании не указано по какому полю)
        return response.data.filter((pair) => pair.counter === "USDT");
      })
      .catch((error) => {
        return rejectWithValue(error?.response?.data || error);
      });
  }
);

export const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {
    toggleFavoritePair(state, action: PayloadAction<{ name: string }>) {
      const { name } = action.payload;
      const index = state.favoritePairs.findIndex(
        (favoritePairName) => favoritePairName === name
      );
      if (index < 0) {
        state.favoritePairs.push(name);
      } else {
        state.favoritePairs.splice(index, 1);
      }
    },
  },
  extraReducers: {
    // fetchCurrencyPairs
    [fetchCurrencyPairs.pending.type]: (state, action) => {
      state.currencyPairs = {
        isLoading: true,
        data: [],
        error: {},
      };
    },
    [fetchCurrencyPairs.fulfilled.type]: (state, action) => {
      state.currencyPairs = {
        isLoading: false,
        data: action.payload,
        error: {},
      };
    },
    [fetchCurrencyPairs.rejected.type]: (state, action) => {
      state.currencyPairs = {
        isLoading: false,
        data: [],
        error: action.payload,
      };
    },
  },
});

export const selectCurrencyPairs = (state: RootState) =>
  state.catalog.currencyPairs;
export const selectFavoritePairs = (state: RootState) =>
  state.catalog.favoritePairs;

export const { toggleFavoritePair } = catalogSlice.actions;
