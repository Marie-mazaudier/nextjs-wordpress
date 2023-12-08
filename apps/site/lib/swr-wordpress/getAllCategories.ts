import useSWR from "swr";
import { fetcher } from "../utils/fetcher.utils";


// *************** get all category,name,slug ***************

/**
 * get all available categories
 * @returns | { data ,isLoading, isError}
 */

export const useGetAllCategories = () => {
  const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/wp-json/wp/v2/categories`, fetcher, {
    fallbackData: [],
  });

  const categoryFilter = data?.filter((item: any) => item?.name != "Uncategorized");

  return {
    categories: categoryFilter || [],
    isLoading: true,
    isError: error,
  };
};
