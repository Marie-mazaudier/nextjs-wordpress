import useSWR from "swr";
import { fetcher } from "../utils/fetcher.utils";
import { WooCommerce } from "../utils/woocommerce";

const staticQuery = {
  per_page: 10,
};

/**
 * get all products by category id
 * @param query (if any)
 * @returns | { featuredProducts ,featuredProductsError}
 */
export const useAllFeaturedProducts = (query?: any) => {
  const page = query?.per_page ? query?.per_page : 8;
  const {
    data: Products,
    error: featuredProductsError,
    isLoading: featuredProductsLoading,
  } = useSWR(`/api/products/featured-products?per_page=${page}`, fetcher);
  if (Products?.length > 0 && !featuredProductsError && !featuredProductsLoading) {
    const featuredProducts = Products?.map((Product: any) => ({
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
      featuredProducts,
      featuredProductsError,
      featuredProductsLoading,
    };
  }
  return { featuredProducts: [], isError: featuredProductsError, featuredProductsLoading };
};
