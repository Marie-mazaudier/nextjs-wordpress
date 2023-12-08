import { updateCartItem } from "./../../lib/coCart/itemInCart";
import { addCartItem } from "../../lib/coCart/addToCart";
import { removeCartItem } from "../../lib/coCart/itemInCart";

/**
 *add to cart function
 * @param data
 * @param colorValue
 * @param setLoading
 * @param count
 * @param productToast
 */
export const addToCartHandler = async (
  data: any,
  colorValue: any,
  setLoading: any,
  count: number,
  productToast?: any
) => {
  setLoading(true);
  const cartBody = {
    id: `${data?.id}`,
    quantity: `${count}`,
    // color: `${colorValue}`,
    item_data: {
      color: `${colorValue}`,
    },
  };
  try {
    await addCartItem(cartBody).then((res: any) => {
      productToast("Product added to cart", "success");
      setLoading(false);
    });
  } catch (error) {
    productToast("Something went wrong", "error");
    setLoading(false);
  }
};

/**
 *cart & buy now function
 * @param data
 * @param setLoading
 * @param count
 * @param productToast
 * @param router
 */
export const addBuyNowHandler = async (
  data: any,
  setbuyLoading: any,
  count: number,
  productToast: any,
  router: any
) => {
  setbuyLoading(true);
  const cartBody = {
    id: `${data?.id}`,
    quantity: `${count}`,
  };

  try {
    await addCartItem(cartBody).then((res: any) => {
      productToast("Product added to cart", "success");
      router.push("/checkout");
      setbuyLoading(false);
    });
  } catch (error) {
    productToast("Something went wrong", "error");
    setbuyLoading(false);
  }
};

/**
 *  remove from cart function
 * @param itemKey
 * @param productToast
 * @param setLoading
 */
export const removeCartItemHandler = async (itemKey: any, productToast: any, setLoading: any) => {
  setLoading(true);
  try {
    await removeCartItem(itemKey).then((res: any) => {
      productToast("Product Successfully Removed from the cart", "success");
      setLoading(false);
    });
  } catch (error) {
    productToast("Sorry ! Something went wrong", "error");
    setLoading(false);
  }
};

/**
 *  update  cart function
 * @param itemKey
 * @param count
 * @param productToast
 * @param setLoading
 */
export const updateCartItemHandler = async (itemKey: any, count: number, productToast: any, setLoading: any) => {
  setLoading(true);
  const cartBody = {
    quantity: `${count}`,
  };
  try {
    await updateCartItem(itemKey, cartBody).then((res: any) => {
      productToast("Product Successfully updated", "success");
      setLoading(false);
    });
  } catch (error) {
    productToast("Sorry ! Something went wrong", "error");
    setLoading(false);
  }
};
