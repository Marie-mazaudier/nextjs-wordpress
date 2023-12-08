import React from "react";
import { Button } from "../../atoms/button/Button";
import { Spaces } from "../../atoms/space/Spaces";
import { ProductCardOne } from "../../molecules/product-card/ProductCardOne";
import { ProductCardTwo } from "../../molecules/product-card/ProductCardTwo";

interface ProductFourProps {
  data?: any;
}
export const ProductFour = ({ data }: ProductFourProps) => {
  const cardData = data?.length > 0 ? data : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  return (
    <>
      <Spaces size="xs" />
      <div className="grid grid-cols-1  xl:grid-cols-2 gap-7">
        {cardData.map((singleData: any, index: number) => (
          <ProductCardTwo key={index} data={singleData} />
        ))}
      </div>
    </>
  );
};
