import { ImageGallery } from "@jstemplate/ecommerce-ui";
import React from "react";
import CartAndBuy from "./CartAndBuy";
import ProductShortDescription from "./ProductShortDescription";

interface ProductDetailsProps {
  data?: any;
  isLoading?: boolean;
}

export const ProductDetails = ({ data, isLoading }: ProductDetailsProps) => {
  return (
    <section className="px-5 md:px-0">
      <div className="container mx-auto flex flex-col lg:flex-row gap-12">
        <div className=" w-full lg:w-1/2">
          <ImageGallery images={data?.[0]?.image} discount={data?.[0]?.discount} />
        </div>
        <div className="w-full lg:w-1/2">
          <ProductShortDescription data={data?.[0]} />
          <div className="mt-5">
            <CartAndBuy data={data?.[0]} />
          </div>
        </div>
      </div>
    </section>
  );
};
