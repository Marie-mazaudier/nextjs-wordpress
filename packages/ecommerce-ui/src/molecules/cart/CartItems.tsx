import React from "react";
import { RxCross2 } from "react-icons/rx";
import Link from "next/link";
import { Placeholder } from "../../atoms/placeholder/Placeholder";
import { BodyText } from "../../atoms/typography/bodyText/BodyText";
import { ProductProps } from "../../types";
import { CuponCode } from "./CuponCode";
import { CartCount } from "./CartCount";
interface CartItemsProps {
  cartData?: any;
  onRemoveCartItem?: any;
  onUpdateCartItem?: any;
  productToast?: any;
}
export const CartItems = ({ cartData, onRemoveCartItem, onUpdateCartItem, productToast }: CartItemsProps) => {
  const AllCartItems = cartData?.items ? cartData?.items : [];
  const convertPrice = (price: string) => {
    const finalPrice = (parseInt(price) / 100).toFixed(2);
    return finalPrice;
  };
  return (
    <>
      {/* large screen view */}
      <div className="hidden md:grid grid-cols-12 gap-10 xl:gap-20 justify-between border bg-themeSecondary100 rounded-xl w-full py-5">
        <div className="col-span-6">
          {" "}
          <BodyText size="md" intent="medium" className="uppercase pl-11  text-themeSecondary600">
            PRODUCT
          </BodyText>
        </div>
        <div className="flex justify-between col-span-6">
          <BodyText size="md" intent="medium" className="uppercase text-themeSecondary600">
            PRICE
          </BodyText>
          <BodyText size="md" intent="medium" className="uppercase text-themeSecondary600">
            QUANTITY
          </BodyText>
          <BodyText size="md" intent="medium" className="uppercase text-themeSecondary600 pr-5">
            SUBTOTAL
          </BodyText>
        </div>
      </div>

      {AllCartItems?.map((singleData: any, index: number) => (
        <div
          key={index}
          className="hidden md:grid grid-cols-12 gap-10 xl:gap-20 justify-between w-full border mt-3 rounded-xl py-5"
        >
          <div className="flex items-center w-full gap-7 col-span-6 pl-5">
            <div className="shrink-0">
              <RxCross2
                className="w-5 h-5 cursor-pointer text-themeSecondary400 hover:text-themePrimary700 transition duration-300 ease-in-out"
                onClick={() => {
                  onRemoveCartItem(singleData?.item_key);
                }}
              />
            </div>
            <div className="bg-themeSecondary100 flex items-center justify-center p-1 rounded-xl shrink-0">
              <Placeholder src={singleData?.featured_image} imageWidth={50} imageHeight={50} />
            </div>
            <Link href={`/shop/product/${singleData?.slug}`}>
              <BodyText size="md" intent="medium" className="text-themeSecondary800 line-clamp-1">
                {singleData?.title}
              </BodyText>
            </Link>
          </div>
          <div className="flex items-center justify-between col-span-6 pr-5">
            <BodyText size="md" intent="medium" className="text-themeSecondary500 ">
              ${convertPrice(singleData?.price)}
            </BodyText>
            <CartCount data={singleData} onUpdateCartItem={onUpdateCartItem} />
            <BodyText size="md" intent="medium" className="text-themeSecondary500 text-end">
              ${(singleData?.totals?.total).toFixed(2)}
            </BodyText>
          </div>
        </div>
      ))}

      {/* small screen view */}
      <div className="w-full mt-10 md:hidden">
        {AllCartItems?.map((singleData: any, index: number) => (
          <div key={index} className="w-full p-4 mt-3 border rounded-xl">
            <div className="flex items-center justify-between w-full gap-6">
              <div className="shrink-0">
                <Placeholder src={singleData?.featured_image} imageWidth={50} imageHeight={50} />
              </div>
              <Link href={`/shop/product/${singleData?.slug}`}>
                <BodyText size="md" intent="medium" className="text-themeSecondary800 line-clamp-1">
                  {singleData?.title}
                </BodyText>
              </Link>
              <RxCross2
                className="w-5 h-5 cursor-pointer text-themeSecondary400 shrink-0"
                onClick={() => {
                  onRemoveCartItem(singleData?.item_key);
                }}
              />
            </div>
            <div className="flex items-center justify-between mt-7">
              <div className="space-y-5">
                <BodyText size="md" intent="medium" className="uppercase text-themeSecondary600 text-start">
                  PRICE
                </BodyText>
                <BodyText size="md" intent="medium" className="uppercase text-themeSecondary600 text-start">
                  QUANTITY
                </BodyText>
                <BodyText size="md" intent="medium" className="uppercase text-themeSecondary600 text-end">
                  SUBTOTAL
                </BodyText>
              </div>
              <div className="space-y-5">
                <BodyText size="md" intent="medium" className="text-themeSecondary500 text-end">
                  ${singleData?.price}
                </BodyText>
                <CartCount data={singleData} onUpdateCartItem={onUpdateCartItem} />
                <BodyText size="md" intent="medium" className="text-themeSecondary500 text-end">
                  ${singleData?.totals?.total}
                </BodyText>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
