import useSWR from "swr";
import { fetcher } from "../utils/fetcher.utils";


/**
 * get all products by localStorage recent viewed products
 * @param id product id for get products from cookie
 * @returns | { products ,error}
 */
export const useRecentViewedProducts = (page?: number) => {
  const { data, error, isLoading } = useSWR(`/api/products/recent-view?page=${page}`, fetcher);
  if (data?.length > 0 && !error) {
    const recentViewData = data?.map((product: any) => ({
      id: product?.id,
      name: product?.name,
      slug: product?.slug,
      price: product?.price,
      image: product?.images,
      description: product?.description,
      short_description: product?.short_description,
      categories: product?.categories,
      tags: product?.tags,
      attributes: product?.attributes,
      rating: product?.average_rating,
      reviews: product?.rating_count,
      createdDate: product?.date_created,
      modifiedDate: product?.date_modified,
      stock: product?.stock_status,
      on_sale: product?.on_sale,
      sale_price: product?.sale_price,
      regular_price: product?.regular_price,
      discount: (100 * (product?.regular_price - product?.price)) / product?.regular_price,
    }));
    return { recentViewData, error };
  }
  return { recentViewData: [], error, isLoading };
};
