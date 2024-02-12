import React from "react";
import useSWR from "swr";
import { fetcher } from "../utils/fetcher.utils";

/**
 * get single product by slug
 * @param woocommerce product list parameters in object. Ex: {per_page: 10,}
 * @returns | { products: [], isError, isLoading}
 */
export const useGetAllProducts = (query?: any) => {
  const {
    data: Products,
    error: productsError,
    isLoading,
  } = useSWR(`/api/products?${new URLSearchParams(query)}`, fetcher);
  if (Products?.length > 0 && !productsError) {
    const products = Products?.map((Product: any) => ({
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
      stock_quantity: Product?.stock_quantity,
      on_sale: Product?.on_sale,
      sale_price: Product?.sale_price,
      regular_price: Product?.regular_price,
      discount: (100 * (Product?.regular_price - Product?.price)) / Product?.regular_price,
    }));
    //console.log('products', products)
    return {

      products,
      isError: productsError,
      isLoading,
    };
  }
  return { products: [], isError: productsError, isLoading };
};
