import useSWR from "swr";
import { fetcher } from "../utils/fetcher.utils";

/**
 * get single product by slug
 * @param slug product slug for get product
 * @returns | { product ,productError}
 */
export const useProduct = (slug: any) => {
  const {
    data: Product,
    error: productError,
    isLoading,
  } = useSWR(`/api/products/single-product?slug=${slug}`, fetcher);

  if (Product?.length > 0 && !productError) {
    const product = Product?.map((Product: any) => ({
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
      variations: Product?.variations,
      rating: Product?.average_rating,
      reviews: Product?.rating_count,
      createdDate: Product?.date_created,
      modifiedDate: Product?.date_modified,
      stock: Product?.stock_status,
      stock_quantity: Product?.stock_quantity,
      on_sale: Product?.on_sale,
      sale_price: Product?.sale_price,
      regular_price: Product?.regular_price,
      discount: (100 * (Product?.regular_price - Product?.price)) / Product?.regular_price,
    }));

    return { product, productError, isLoading };
  }

  return { product: [], isError: productError, isLoading };
};
