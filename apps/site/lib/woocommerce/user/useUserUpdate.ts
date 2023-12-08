import React from "react";
import useSWR from "swr";
import axios from "axios";

export function useUpdateCustomer() {
  const { data, error, mutate, isLoading } = useSWR(`/api/auth/retrieve`, async () => {
    const response = await axios.get(`/api/auth/retrieve`);
    return response.data;
  });

  async function updateCustomer(userInfoUdate: any) {
    const { avatar_url, ...rest } = userInfoUdate;
    const response = await axios.put(`/api/auth/update`, rest);
    mutate(response.data);
    return response.data;
  }

  async function updateCustomerBillingAddress(billingAddress: any) {
    const response = await axios.put(`/api/auth/update`, {
      billing: billingAddress,
    });
    mutate(response.data);
    return response.data;
  }

  async function updateCustomerShippingAddress(shippingAddress: any) {
    const response = await axios.put(`/api/auth/update`, {
      shipping: shippingAddress,
    });
    mutate(response.data);
    return response.data;
  }

  return { customer: data, error, updateCustomer, updateCustomerBillingAddress,updateCustomerShippingAddress, isLoading };
}
