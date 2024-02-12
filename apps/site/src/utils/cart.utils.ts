import { updateCartItem } from "./../../lib/coCart/itemInCart";
import { addCartItem } from "../../lib/coCart/addToCart";
import { removeCartItem } from "../../lib/coCart/itemInCart";
const { toast } = require('react-toastify');
import { useCart } from "src/CartContext";
/**
 *add to cart function
 * @param data
 * @param colorValue
 * @param setLoading
 * @param count
 * @param productToast
 */

// ...

export const addToCartHandler = async (
  data: any,
  colorValue: any,
  setLoading: any,
  count: number,
  updateCart: () => void,  // Mettez le paramètre obligatoire en premier
  updateStock: (productId: string, newStock: number) => void, // Annotation du type pour `updateStock`
  productToast?: any, // Puis le paramètre facultatif

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
    await addCartItem(cartBody);
    productToast("Product added to cart", "success");
    setLoading(false);
    updateCart(); // Appel pour mettre à jour l'état global du panier
    // Mise à jour du stock
    const newStock = data.stock - count;
    updateStock(data.id, newStock);
    return true; // Indiquer le succès de l'opération
  } catch (error) {
    productToast("Something went wrong", "error");
    setLoading(false);
    return false; // Indiquer l'échec de l'opération
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
    await addCartItem(cartBody);
    toast("Product added to cart", { type: "success" });
    router.push("/checkout");
    setbuyLoading(false);
  } catch (error) {
    toast("Something went wrong", { type: "error" });
    setbuyLoading(false);
  }
};

/**
 *  remove from cart function
 * @param itemKey
 * @param productToast
 * @param setLoading
 */
export const removeCartItemHandler = async (itemKey: any, setLoading: any) => {
  setLoading(true);
  try {
    await removeCartItem(itemKey);

  } catch (error) {
    toast("Sorry ! Something went wrong", { type: "error" });
    setLoading(false);

  } finally {
    toast("Product Successfully Removed from the cart", { type: "success" });
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


export const updateCartItemHandler = async (itemKey: any, count: number, setLoading: any) => {
  setLoading(true);
  try {
    const response = await updateCartItem(itemKey, { quantity: `${count}` });
    toast("Product Successfully updated", { type: "success" });
    return Promise.resolve(response); // Assurez-vous de retourner une promesse résolue
  } catch (error) {
    toast("Sorry ! Something went wrong", { type: "error" });
    return Promise.reject(error); // Retourner une promesse rejetée en cas d'erreur
  } finally {
    setLoading(false);
  }
};