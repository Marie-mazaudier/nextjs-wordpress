import React from "react";
import { Button } from "../../atoms/button/Button";
import { Spaces } from "../../atoms/space/Spaces";
import { ProductCardOne } from "../../molecules/product-card/ProductCardOne";
import { ProductHeader } from "../../../../../apps/site/src/components/products/ProductHeader";

interface ProductTwoProps {
  data?: any;
}
export const ProductTwo = ({ data }: ProductTwoProps) => {
  const cardData = data?.length > 0 ? data : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  return (
    <>
      <Spaces size="xs" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 justify-items-center	">
        {cardData.map((singleDta: any, index: number) => (
          <ProductCardOne key={index} data={singleDta} />
        ))}
      </div>
    </>
  );
};
