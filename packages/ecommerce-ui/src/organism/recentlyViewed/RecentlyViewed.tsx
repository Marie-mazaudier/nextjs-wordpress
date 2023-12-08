import React from "react";
import Link from "next/link";
import { Button } from "../../atoms/button/Button";
import { Heading2 } from "../../atoms/typography/headingText/Heading2";
import { TrendingProductCard } from "../productsCard/TrendingProductCard";

interface RecentlyViewedProps {
  title?: string;
  data?: any;
  link?: string;
  buttonText?: string;
}
export const RecentlyViewed = ({
  data,
  title = "Recently Viewed",
  link = "/recently-viewed",
  buttonText = "View More",
}: RecentlyViewedProps) => {
  const cardData = data?.length > 0 ? data : [1, 2, 3, 4];
  return (
    <>
      <section className="container mx-auto px-5 md:px-0">
        <div className=" flex items-center flex-col gap-5 md:flex-row justify-between">
          <Heading2 intent="bold" className=" text-themeSecondary800">
            {title}
          </Heading2>
          <Link href={link}>
            <Button size="xl" type="pill" color="light">
              {buttonText}
            </Button>
          </Link>
        </div>
        <div className=" mt-11 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 lg:gap-7 justify-items-center">
          {cardData.map((singleData: any, index: number) => (
            <TrendingProductCard key={index} data={singleData} />
          ))}
        </div>
      </section>
    </>
  );
};

export default RecentlyViewed;
