import useSWR from "swr";
import { fetcher } from "../utils/fetcher.utils";

/**
 * get all category
 * @endpoint products/categories
 * @returns | { productCategories ,productCategoriesError}
 */
export const useProductCategories = () => {
  const { data: ProductCategories, error: productCategoriesError } = useSWR("/api/products/categories", fetcher);
  if (ProductCategories?.length > 0 && !productCategoriesError) {
    const productCategories = ProductCategories?.map((ProductCategory: any) => ({
      id: ProductCategory?.id,
      name: ProductCategory?.name,
      slug: ProductCategory?.slug,
      count: ProductCategory?.count,
      image: ProductCategory?.image?.src,
    }));
    return {
      productCategories,
      productCategoriesError,
    };
  }
  return { productCategories: [], isError: productCategoriesError };
};
