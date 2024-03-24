import { updateCartItem } from "./../../lib/coCart/itemInCart";
import { addCartItem } from "../../lib/coCart/addToCart";
import { removeCartItem } from "../../lib/coCart/itemInCart";
const { toast } = require('react-toastify');

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
  updateCart: () => void,
  updateStock: (productId: string, newStock: number) => void,
  productToast: (message: string, type: "success" | "error") => void
) => {
  setLoading(true);
  const cartBody = {
    id: `${data?.productId}`,
    quantity: `${count}`,
    item_data: {
      color: `${colorValue}`,
    },
  };

  try {
    const response = await addCartItem(cartBody);
    if (response && response.data) {
      productToast("Produit ajouté au panier", "success");
      updateCart();
      const newStock = data.stockQuantity - count;
      updateStock(data.productId, newStock);
    }
    setLoading(false);
    return { success: true, code: "" }; // Retourne success true sans code d'erreur

  } catch (error: any) {
    setLoading(false);
    // Ici, on vérifie si l'erreur est spécifique à un produit épuisé
    if (error?.statusCode === 404 && error?.message.includes("out of stock")) {
      productToast("Désolé, ce produit n'est plus en stock", "error");
      return { success: false, code: "OUT_OF_STOCK" };
    } if (error?.statusCode === 403 && error?.message.includes("already have")) {
      productToast("Stock insuffisant, ce produit est déjà dans votre panier", "error");
      return { success: false, code: "STOCK_INSUFFISANT" };
    } else {
      productToast("Une erreur est survenue", "error");
      return { success: false, code: "ERROR" }; // Un code général pour les autres erreurs
    }
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
    id: `${data?.productId}`,
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