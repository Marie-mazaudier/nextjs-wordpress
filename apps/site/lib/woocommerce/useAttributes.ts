import useSWR from "swr";
import { fetcher } from "../utils/fetcher.utils";


/**
 * get all attributes list
 * @returns | { attributes || [], isError }
 *  */
export const useProductsAttributes = () => {
  const { data: Attributes, error } = useSWR("/api/products/attributes", fetcher);
  return { attributes: Attributes || [], isError: error };
};
