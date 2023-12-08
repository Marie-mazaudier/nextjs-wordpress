import useSWR from "swr";
import { fetcher } from "../utils/fetcher.utils";

/**
 * get all attributes terms
 * @param attribute Id as a params
 * @returns | { attributeTerms || [], isError }
 */
export const useAttributeTerms = (attributeId?: any) => {
  const url = attributeId ? `/api/products/attributes-terms?attributeId=${attributeId}` : null;
  const { data: AttributesTerms, error } = useSWR(url, fetcher);
  if (AttributesTerms?.length > 0 && !error) {
    const terms = AttributesTerms?.map((Attribute: any) => ({
      value: Attribute?.id,
      name: Attribute?.name,
    }));
    return { attributeTerms: terms || [], isError: error };
  }
  return { attributeTerms: [], isError: error };
};
