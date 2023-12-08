import axios from "axios";
import { getCookie } from "cookies-next";

export const removeCartItem = async (itemKey: any) => {
  try {
    // get cart key
    const cartKey = getCookie("cart_key");

    //  call api to delete cart item
    const data = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/wp-json/cocart/v2/cart/item/${itemKey}?cart_key=${cartKey}`
    );

    return {
      message: "Successfully updated cart",
      data: data?.data,
    };
  } catch (error: any) {
    // return {
    //   message: "Something went wrong",
    //   error: error.message,
    // };
    throw error;
  }

  //   const cartKey = getCookie("cart_key");
  //   return await axios
  //     .delete(`${process.env.NEXT_PUBLIC_API_URL}/wp-json/cocart/v2/cart/item/${itemKey}?cart_key=${cartKey}`)
  //     .then((response) => {
  //       return response;
  //     })
  //     .catch((error) => {
  //       throw error;
  //     });
};

export const updateCartItem = async (itemKey: string, cartBody: any) => {
  try {
    // get cart key
    const cartKey = getCookie("cart_key");

    //  call api to update cart item
    const data = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/wp-json/cocart/v2/cart/item/${itemKey}?cart_key=${cartKey}`,
      cartBody
    );

    return {
      message: "Successfully updated cart",
      data: data?.data,
    };
  } catch (error: any) {
    // return {
    //   message: "Something went wrong",
    //   error: error.message,
    // };
    throw error;
  }
};
