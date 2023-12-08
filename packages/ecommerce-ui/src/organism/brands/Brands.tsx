// brands.tsx
import React from "react";
import Skeleton from "react-loading-skeleton";
import { Placeholder } from "../../atoms/placeholder/Placeholder";
import { generateBrandsData } from "../../data/ClientsData";
import { ClientCard } from "../../molecules/client/ClientCard";

interface BrandsProps {
  data?: any;
}
export const Brands = ({ data }: BrandsProps) => {
  const cardData = data?.length > 0 ? data : [1, 2, 3, 4, 5];
  return (
    <section className="px-5 md:px-0">
      <div className="container mx-auto p-14 rounded-2xl">
        <div className="flex items-center flex-col md:flex-row justify-center gap-10">

          {cardData.map((item: any, index: number) => (
            <ClientCard key={index} data={item} />
          ))}
        </div>
      </div>
    </section>
  );
};
