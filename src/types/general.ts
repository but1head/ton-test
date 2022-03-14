export type CurrencyPair = {
  base: string;
  baseAddress: string;
  counterAddress: string;
  counter: string;
  poolAddress: string;
  fee: string;
};

export type Currency = {
  currency: string;
  address: string;
  price: string;
  priceChange: string;
  tvl: string;
  tvlChange: string;
  volume24h: string;
  volumeChange24h: string;
  volume7d: string;
  fee24h: string;
  transactionsCount24h: string;
};
