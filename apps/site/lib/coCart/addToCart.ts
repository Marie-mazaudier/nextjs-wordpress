import axios from "axios";
import { getCookie, setCookie } from "cookies-next";

export const addCartItem = async (cartBody: any) => {
  try {
    // check if cart_key is available on token cookie
    const cartKey = getCookie("cart_key");

    let response;
    // if no cart key is available, call api to create a new cart
    if (!cartKey) {
      response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/wp-json/cocart/v2/cart/add-item`, cartBody);
      // set cart_key on cookie
      setCookie("cart_key", response.data.cart_key);
    } else {
      // if cart key is available, call api to add item to cart
      response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/wp-json/cocart/v2/cart/add-item?cart_key=${cartKey}`,
        cartBody
      );
    }

    // Retourner une réponse réussie
    return {
      message: "Successfully added to cart",
      data: response.data,
    };
  } catch (error: any) {
    // Ici, on rejette la promesse avec l'erreur renvoyée par Axios, incluant le status HTTP et le message d'erreur
    if (axios.isAxiosError(error)) {
      // Extraire le code de statut HTTP et le message d'erreur de la réponse Axios
      const errorMessage = error.response?.data.message || "Something went wrong";
      const statusCode = error.response?.status || 500;

      // Rejeter explicitement la promesse avec un objet d'erreur contenant ces détails
      throw { message: errorMessage, statusCode };
    }

    // Si l'erreur n'est pas une erreur Axios, rejeter avec un message générique
    throw { message: "An unknown error occurred", statusCode: 500 };
  }
};
