import React from "react";
import { TrendingProductCard } from "../productsCard/TrendingProductCard";
import { CountDown } from "./CountDown";
interface FlashSaleProps {
  data?: any;
  sectionTitle?: string;
  startingDate?: string;
  buttonText?: string;
  buttonLink?: string;
}
export const FlashSale = ({
  data,
  sectionTitle = "Flash Sales",
  startingDate,
  buttonText,
  buttonLink,
}: FlashSaleProps) => {
  const cardData = data?.length > 0 ? data.slice(0, 4) : [1, 2, 3, 4];
  return (
    <section className="container mx-auto px-3 md:px-0">
      <CountDown
        sectionTitle={sectionTitle}
        startingDate={startingDate}
        buttonText={buttonText}
        buttonLink={buttonLink}
      />
      <div className=" mt-11 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 lg:gap-7 justify-items-center">
        {cardData?.map((singleData: any, index: number) => (
          <TrendingProductCard key={index} data={singleData} />
        ))}
      </div>
    </section>
  );
};
