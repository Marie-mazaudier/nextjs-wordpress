import React from "react";
import { OfferBanner } from "../../molecules/newsletter/offerBanner/OfferBanner";

interface MiniBannerProps {
  data?: any;
}
export const MiniBanner = ({ data }: MiniBannerProps) => {
  const cardData = data?.length > 0 ? data : [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <section className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 justify-items-center  px-3 md:px-0">
      {cardData.slice(0, 1).map((singleData: any, index: number) => (
        <OfferBanner key={index} data={singleData} />
      ))}
      {cardData.slice(1, 2).map((singleData: any, index: number) => (
        <OfferBanner key={index} data={singleData} />
      ))}
      <div className=" hidden lg:block">
        {cardData.slice(2, 3).map((singleData: any, index: number) => (
          <OfferBanner key={index} data={singleData} />
        ))}
      </div>
    </section>
  );
};
