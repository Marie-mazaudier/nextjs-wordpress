import { BodyText, Button, SocialShare } from "@jstemplate/ecommerce-ui";
import Link from "next/link";
import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import Skeleton from "react-loading-skeleton";
import { addBuyNowHandler, addToCartHandler } from "../../utils/cart.utils";
import { useToasts } from "react-toast-notifications";
import { useRouter } from "next/router";
import { LoaderRound } from "../../loaders/Loader";
interface CartAndBuyProps {
  data?: any;
}

const CartAndBuy = ({ data }: CartAndBuyProps) => {
  //==========filter product color attributes============
  const colorAttribute = data?.attributes.find((attribute: any) => attribute.name.toLowerCase() === "color");

  const [itemValue, setItemValue] = React.useState("");
  const [count, setCount] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [buyLoading, setbuyLoading] = React.useState(false);

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
                className={`p-4 rounded-full border ${
                  itemValue == item ? "border-themePrimary600" : " border-themeSecondary200"
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
                disabled={count === 1}
                onClick={() => setCount(count - 1)}
                className="w-10 h-10 rounded-md flex items-center justify-center cursor-pointer relative after:content-[''] after:absolute after:top-1 after:border-r-2 after:border-themeSecondary200 after:h-8 after:right-0"
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
                onClick={() => setCount(count + 1)}
                className="w-10 h-10  flex items-center justify-center cursor-pointer relative after:content-[''] after:absolute after:top-1 after:border-r-2 after:border-themeSecondary200 after:h-8 after:right-10"
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
                addToCartHandler(data, itemValue, setLoading, count, productToast);
              }}
              disabled={loading || stockOut}
              type="submit"
              className={`font-medium text-base px-7 py-[14px] leading-6 text-white transition rounded-full bg-themePrimary600 hover:duration-500 flex justify-center ${
                stockOut ? "opacity-30" : "hover:bg-themeSecondary800"
              }`}
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
              disabled={buyLoading || stockOut}
              type="submit"
              className={`font-medium text-base px-7 py-[14px] leading-6 text-white transition rounded-full bg-themeSecondary800  hover:duration-500 flex justify-center ${
                stockOut ? "opacity-30" : "hover:bg-themePrimary600"
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
      <div className="border border-themeSecondary200 w-full mt-5"></div>
      <div className="flex items-center justify-end mt-5">
        <SocialShare />
      </div>
    </div>
  );
};

export default CartAndBuy;
