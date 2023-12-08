import axios from "axios";
import { getCookie } from "cookies-next";
import useSWR from "swr";

const cartFetcher = async (url: string) => axios.get(url).then((res) => res.data);

export const useGetCartTotals = () => {
  const cartKey = getCookie("cart_key");
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/wp-json/cocart/v2/cart/totals?cart_key=${cartKey}`,
    cartFetcher,
    {
      fallbackData: {},
      refreshInterval: 1000,
    }
  );
  return {
    data,
    isError: error,
    isLoading,
  };
};
