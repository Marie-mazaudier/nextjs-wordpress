import axios from "axios";
import { getCookie, setCookie } from "cookies-next";

export const addCartItem = async (cartBody: any) => {
  try {
    // check if cart_key is available on token cookie
    const cartKey = getCookie("cart_key");

    // if no cart key is avilable, call api to create a new cart
    if (!cartKey) {
      //  call api to get cart data
      const data = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/wp-json/cocart/v2/cart/add-item`, cartBody);

      // set cart_key on cookie
      setCookie("cart_key", data.data.cart_key);
      return {
        message: "Successfully added to cart",
        data: data?.data,
      };
    }

    // if cart key is available, call api to add item to cart
    const data = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/wp-json/cocart/v2/cart/add-item?cart_key=${cartKey}`,
      cartBody
    );

    return {
      message: "Successfully added to cart",
      data: data.data,
    };
  } catch (error: any) {
    // return {
    //   message: "Something went wrong",
    //   error: error.message,
    // };
    throw error;
  }
};
