import React from "react";
import useSWR from "swr";
import { fetcher } from "../utils/fetcher.utils";

export const useSearchProducts = (query: string) => {
  const { data, error, isLoading } = useSWR(`/api/products/product-search?searchWord=${query}`, fetcher);
  if (data?.length > 0 && !error) {
    const filterData = data?.map((product: any) => ({
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
    return {
      products: filterData,
      isLoading,
      isError: error,
    };
  }
  return {
    products: [],
    isLoading,
    isError: error,
  };
};
