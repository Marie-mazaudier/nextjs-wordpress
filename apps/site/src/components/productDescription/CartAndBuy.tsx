import { BodyText, Button, SocialShare } from "@jstemplate/ecommerce-ui";
import Link from "next/link";
import React, { useEffect } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import Skeleton from "react-loading-skeleton";
import { addBuyNowHandler, addToCartHandler } from "../../utils/cart.utils";
import { useToasts } from "react-toast-notifications";
import { useRouter } from "next/router";
import { LoaderRound } from "../../loaders/Loader";
import { useCart } from "src/CartContext";
import { useGetCartData } from "lib/coCart/getCart";

interface CartAndBuyProps {
  data?: any;
}

const CartAndBuy = ({ data }: CartAndBuyProps) => {
  //==========filter product color attributes============
  const colorAttribute = data?.attributes.find((attribute: any) => attribute.name.toLowerCase() === "color");
  const { updateCart, updateStock, cart } = useCart(); // Récupération de updateStock depuis le contexte
  // ==================Get all cart items data=================
  const { data: cartData } = useGetCartData();

  const [itemValue, setItemValue] = React.useState("");
  const [count, setCount] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [buyLoading, setbuyLoading] = React.useState(false);
  const [maxQuantity, setMaxQuantity] = React.useState(data?.stock_quantity);

  const router = useRouter();
  const { addToast } = useToasts();
  //==========select default color============
  React.useEffect(() => {
    setItemValue(colorAttribute?.options?.[0]);
  }, [data, colorAttribute]);


  const handleOnchange = (e: any) => {
    const value = e?.target?.value;
    if (value) {
      setItemValue(value);
    }
  };

  const productToast = (message: string, type: any) => {
    addToast(`${message}`, {
      appearance: type,
      autoDismiss: true,
    });
  };

  const stockOut = data?.stock === "outofstock";
  useEffect(() => {
    // S'assurer que `data` est défini avant de continuer
    if (data && cart.items) {
      const productInCart = cart.items.find(item => item.id === data.id);
      if (productInCart) {
        // Si le produit est déjà dans le panier, ajustez la quantité disponible
        const availableQuantity = data.stock_quantity - productInCart.quantity.value;
        setMaxQuantity(availableQuantity);

      } else {
        // Si le produit n'est pas dans le panier, utilisez la quantité de stock initial
        setMaxQuantity(data.stock_quantity);
      }
    }
  }, [cart.items, data]);

  //console.log("produit", data)
  // console.log("maxQuantity", maxQuantity)


  return (
    <div>
      <BodyText size="md" intent="semibold" className="text-themeSecondary800">
        {data ? "COLORS" : <Skeleton height={23} width={100} />}
      </BodyText>
      {data ? (
        <div className=" flex flex-wrap items-center gap-2.5 mt-3">
          {colorAttribute?.options.map((item: any, index: number) => (
            <label key={index} htmlFor={item?.name} className="cursor-pointer h-fit p-1">
              <div
                className={`p-4 rounded-full border ${itemValue == item ? "border-themePrimary600" : " border-themeSecondary200"
                  }  relative`}
              >
                <input
                  id={item}
                  name="color-group"
                  color={item}
                  type="radio"
                  value={item}
                  style={{ backgroundColor: item }}
                  className={`cursor-pointer appearance-none	inline-block  w-6 h-6 rounded-full absolute right-1 top-1`}
                  onChange={handleOnchange}
                />
              </div>
            </label>
          ))}
        </div>
      ) : (
        <div className=" flex flex-wrap items-center gap-2.5 mt-3">
          {[1, 2, 3].map((item: any) => (
            <Skeleton key={item} height={24} width={24} circle={true} />
          ))}
        </div>
      )}
      <div className="border border-themeSecondary200 w-full mt-5"></div>
      <div className="flex flex-col md:flex-row md:items-center gap-7 mt-5">
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-4">
          {data ? (
            <div className="flex md:mx-auto sm:mx-0 items-center h-12 border border-themeSecondary300 p-2 rounded-full">
              <button
                onClick={() => setCount(prevCount => Math.max(prevCount - 1, 1))}
                disabled={loading || stockOut || count <= 1}
                className="decrease-quantity-button" // Utilisez vos propres classes ici
              >
                <AiOutlineMinus className=" text-lg text-themeSecondary400 " />
              </button>

              <input
                className="mx-2 text-center w-8 focus:outline-none border-none text-lg font-semibold  text-themeSecondary800"
                type="text"
                value={count}
                readOnly
              />

              <button
                onClick={() => setCount(prevCount => Math.min(prevCount + 1, maxQuantity))}
                disabled={loading || stockOut || count >= maxQuantity} // Utilisez `test` pour la condition de désactivation
                className="increase-quantity-button"
              >
                <AiOutlinePlus className=" text-lg text-themeSecondary400" />
              </button>
            </div>
          ) : (
            <Skeleton height={52} width={146} borderRadius={50} />
          )}
        </div>
        <div className=" flex items-center gap-3">
          {data ? (
            <button
              onClick={() => {
                addToCartHandler(data, itemValue, setLoading, count, () => updateCart(), () => updateStock(data.id, data.stock_quantity - count), productToast);
              }}
              disabled={loading || stockOut || maxQuantity === 0}
              type="submit"
              className={`font-medium text-base px-7 py-[14px] leading-6 text-white transition rounded-full bg-themePrimary600 hover:duration-500 flex justify-center ${stockOut ? "opacity-30" : "hover:bg-themeSecondary800"}`}
            >

              {loading && <LoaderRound />}
              <span className={`${loading ? "ml-2" : ""}`}>{loading ? "Please Wait.." : "Add To Cart"}</span>
            </button>
          ) : (
            <Skeleton height={52} width={147} borderRadius={50} />
          )}
          {data ? (
            <button
              onClick={() => {
                addBuyNowHandler(data, setbuyLoading, count, productToast, router);
              }}
              disabled={loading || stockOut || maxQuantity === 0}
              type="submit"
              className={`font-medium text-base px-7 py-[14px] leading-6 text-white transition rounded-full bg-themeSecondary800  hover:duration-500 flex justify-center ${stockOut ? "opacity-30" : "hover:bg-themePrimary600"
                }`}
            >
              {buyLoading && <LoaderRound />}
              <span className={`${buyLoading ? "ml-2" : ""}`}>{buyLoading ? "Please Wait.." : " Buy Now"}</span>
            </button>
          ) : (
            <Skeleton height={52} width={128} borderRadius={50} />
          )}
        </div>
      </div>
      {maxQuantity === 0 && (
        <div className="out-of-stock-message">
          Cet article est dans votre panier, le stock est désormais épuisé.
        </div>
      )}
      {maxQuantity > 0 && maxQuantity <= 5 && (
        <div className="low-stock-message">
          Il ne reste plus que {maxQuantity} articles en stock.
        </div>
      )}
      <div className="border border-themeSecondary200 w-full mt-5"></div>
      <div className="flex items-center justify-end mt-5">
        <SocialShare />
      </div>
    </div>
  );
};

export default CartAndBuy;