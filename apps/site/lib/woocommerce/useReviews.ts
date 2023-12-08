import React from "react";
import useSWR from "swr";
import { fetcher } from "../utils/fetcher.utils";

/**
 * get all reviews
 * @param id post id for get all reviews
 * @returns | { review ,reviewsError} 
 */
export const useReviews = (id: any) => {
  const {
    data: Reviews,
    error: reviewsError,
    isLoading,
  } = useSWR(`/api/products/review?id=${id}`, fetcher, { refreshInterval: 3000 });
  if (Reviews?.length > 0 && !reviewsError) {
    const reviews = Reviews?.map((Review: any) => ({
      id: Review?.id,
      name: Review?.reviewer,
      rating: Review?.rating,
      date: Review?.date_created,
      content: Review?.review,
    }));
    return {
      reviews,
      reviewsError,
      isLoading,
    };
  }
  return { reviews: [], isError: reviewsError, isLoading };
};