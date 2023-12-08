import React from "react";
import useSWR from "swr";
import { fetcher } from "../utils/fetcher.utils";


/**
 * get all products by localStorage wishlist products
 * @param id product id for get product from localStorage
 * @returns | { product ,error}
 */
export const useWishlistProducts = (page?: number) => {
  let wishlist = [] as any[];
  let productId = [] as any[];
  // let userIdId = [] as any[];
  try {
    if (typeof window !== 'undefined') {
      wishlist = JSON.parse(localStorage.getItem("wishlist_data") as string) as any[];
      wishlist?.map((item: any) => {
        productId.push(item?.productId);
      });
    }
  } catch (err) {
    console.error(err);
  }
  if (!productId || productId.length === 0) {
    return { wishlistData: [], error: "No data" };
  }


  const { data, error, isLoading } = useSWR(`/api/products/wishlists?include=${productId}`, fetcher);
  if (data?.length > 0 && !error) {
    const wishlistData = data?.map((product: any) => ({
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
    return { wishlistData, error };
  }
  return { wishlistData: [], error, isLoading };
};
