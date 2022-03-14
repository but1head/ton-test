import axios from "axios";

export let baseURL = "https://ton-swap-indexer.broxus.com/";
export const api = axios.create({ baseURL });


export const API_URL_CURRENCY_PAIRS_META = '/v1/pairs/meta';
export const API_URL_CURRENCIES = '/v1/currencies';
