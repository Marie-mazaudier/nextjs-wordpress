import React from "react";
import useSWR from "swr";
import { fetcher } from "../../utils/fetcher.utils";

export const useUserDetails = () => {
  const { data: user, error, isLoading } = useSWR(`/api/auth/retrieve`, fetcher);
  return { user, error, isLoading };
};
