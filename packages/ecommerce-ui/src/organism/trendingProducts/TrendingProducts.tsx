import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../../atoms/button/Button";
import { Tabs } from "../../atoms/tabs/Tabs";
import { TabsData } from "../../data/TabsData";
import { TrendingProductCard } from "../productsCard/TrendingProductCard";

interface TrendingProductsProps {
  data?: any;
  active?: any;
  setActive?: any;
}
export const TrendingProducts = ({ data, active, setActive }: TrendingProductsProps) => {
  const cardData = data?.length > 0 ? data.slice(0, 8) : [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <section className="container mx-auto px-5 md:px-0">
      <Tabs data={TabsData} active={active} setActive={setActive} />
      <div className=" mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 lg:gap-7 justify-items-center">
        {cardData?.map((singleData: any, index: number) => (
          <TrendingProductCard key={index} data={singleData} />
        ))}
      </div>
      <div className="mt-10 flex items-center justify-center">
        <Link href="/shop">
          <Button size="xl" type="pill" color="dark">
            View All Products
          </Button>
        </Link>
      </div>
    </section>
  );
};
