import useSWR from "swr";
import { fetcher } from "../utils/fetcher.utils";

/**
 * get all products by category id
 * @param id category id for get all products
 * @returns | { catproducts ,productsError}
 */
export const useAllProductsByCategoryId = (id: any, query: any) => {
  const {
    data: Products,
    error: productsError,
    isLoading,
  } = useSWR(`/api/products/category-products?categoryId=${id}&${new URLSearchParams(query)}`, fetcher);
  if (Products?.length > 0 && !productsError && !isLoading) {
    const catproducts = Products?.map((Product: any) => ({
      id: Product?.id,
      name: Product?.name,
      slug: Product?.slug,
      price: Product?.price,
      image: Product?.images,
      description: Product?.description,
      short_description: Product?.short_description,
      categories: Product?.categories,
      tags: Product?.tags,
      attributes: Product?.attributes,
      rating: Product?.average_rating,
      reviews: Product?.rating_count,
      createdDate: Product?.date_created,
      modifiedDate: Product?.date_modified,
      stock: Product?.stock_status,
      on_sale: Product?.on_sale,
      sale_price: Product?.sale_price,
      regular_price: Product?.regular_price,
      discount: (100 * (Product?.regular_price - Product?.price)) / Product?.regular_price,
    }));
    return {
      catproducts,
      productsError,
      isLoading,
    };
  }
  return { catproducts: [], isError: productsError, isLoading };
};
