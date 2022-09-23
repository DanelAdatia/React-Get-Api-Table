import axios from "axios";

export const GetApi = () => {
  return axios.get(
    `https://api.binance.com/api/v3/ticker/24hr?symbols=%5B%22BTCUSDT%22,%22ETHUSDT%22,%22ENJUSDT%22,%22GRTUSDT%22%5D`
  );
};
