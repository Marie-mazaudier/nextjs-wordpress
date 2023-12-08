import React from "react";
import { Placeholder, BodyText } from "@jstemplate/ecommerce-ui";
import Link from "next/link";
import { HiStar } from "react-icons/hi2";
import Rating from "react-rating";
import { RiShoppingCartLine } from "react-icons/ri";
import { useSearchProducts } from "../../../lib/woocommerce/useSearch";
import { useToasts } from "react-toast-notifications";
import { addToCartHandler } from "../../utils/cart.utils";

interface SearchCardProps {
  search?: any;
}

export const SearchCard = ({ search }: SearchCardProps) => {
  const { products, isLoading } = useSearchProducts(search);
  const widthWidth = window.innerWidth;
  const largeSize = widthWidth > 1170;
  const [itemValue, setItemValue] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [count, setCount] = React.useState(1);

  const { addToast } = useToasts();
  const productToast = (message: string, type: any) => {
    addToast(`${message}`, {
      appearance: type,
      autoDismiss: true,
    });
  };
  return (
    <div
      className={`bg-white z-50 w-full px-7 pt-7 mb-2 rounded-xl overflow-y-auto scrollBar ${
        search === "" ? "hidden" : "block"
      } ${
        largeSize ? "absolute  shadow-dropShadow2xl h-[600px] " : "mt-44 fixed left-0 right-0 top-0 bottom-0 h-auto"
      }`}
    >
      {!isLoading && products?.length > 0 && (
        <div className="flex items-center justify-between pb-5">
          <BodyText size="sm" className="text-themeSecondary800">
            {products?.length} Result Found
          </BodyText>
          <Link href="/shop">
            <BodyText size="sm" className="text-themePrimary600">
              View All
            </BodyText>
          </Link>
        </div>
      )}
      {products?.length === 0 && !isLoading && (
        <div className="flex  justify-center mt-32">
          <BodyText size="sm" className="text-themeSecondary800 mt-5">
            No Result Found
          </BodyText>
        </div>
      )}

      {!isLoading ? (
        products?.map((item: any, index: number) => (
          <div key={index} className="flex items-center justify-between gap-5 border-t border-themeSecondary200 py-5">
            <div className="flex items-center gap-5">
              <div className="flex items-center justify-center p-2 bg-themeSecondary100 rounded-xl relative shrink-0">
                <Placeholder
                  className="w-full rounded"
                  src={item.image[0].src}
                  imageWidth={90}
                  imageHeight={90}
                  alt="image"
                />
                <p className="absolute top-4 right-3 text-xs text-white bg-themePrimary600 rounded-lg px-2 pt-0.5">
                  {item.discount.toFixed(0)}%
                </p>
              </div>
              <div>
                <Link href={`/shop/product?slug=${item?.slug}`}>
                  <BodyText
                    size="sm"
                    intent="bold"
                    className=" text-themeSecondary800 hover:text-themePrimary600 transition hover:duration-700 line-clamp-2"
                  >
                    {item?.name}
                  </BodyText>
                </Link>
                <div className="flex items-center gap-2 mt-2">
                  <BodyText size="md" intent="semibold" className=" text-themePrimary600">
                    ${item?.sale_price}
                  </BodyText>
                  <BodyText size="xs" className=" text-themeSecondary400 line-through">
                    ${item?.regular_price}
                  </BodyText>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-0.5">
                    {/* @ts-ignore */}
                    <Rating
                      readonly
                      initialRating={item?.rating}
                      emptySymbol={<HiStar className="text-themeSecondary300 h-4 w-4" />}
                      fullSymbol={<HiStar className="text-themeWarning500 h-4 w-4" />}
                    />
                  </div>
                  <BodyText size="sm" className="text-themeSecondary400">
                    ({item?.reviews})
                  </BodyText>
                </div>
              </div>
            </div>
            <div
              className="flex items-center justify-center w-10 h-10 rounded-md bg-themeSecondary100"
              onClick={() => {
                addToCartHandler(item, itemValue, setLoading, count, productToast);
              }}
            >
              <RiShoppingCartLine className="w-5 h-5 text-themeSecondary600 hover:text-themePrimary600 transition duration-300 ease-in-out cursor-pointer" />
            </div>
          </div>
        ))
      ) : (
        <div className="flex justify-center mt-20">
          <svg
            className={`ml-2 h-7 w-7 animate-spin text-red-500`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      )}
    </div>
  );
};
