import React from "react";
import { Button } from "../../atoms/button/Button";
import { ProductCardOne } from "../../molecules/product-card/ProductCardOne";

interface ProductOneProps {
  data?: any;
}

export const ProductOne = ({ data }: ProductOneProps) => {
  const cardData = data?.length > 0 ? data : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 justify-items-center	">
        {cardData.map((singleData: any, index: number) => (
          <ProductCardOne key={index} data={singleData} />
        ))}
      </div>
    </>
  );
};
