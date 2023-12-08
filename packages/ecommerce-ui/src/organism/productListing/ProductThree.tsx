import React from "react";
import { Button } from "../../atoms/button/Button";
import { Spaces } from "../../atoms/space/Spaces";
import { ProductCardTwo } from "../../molecules/product-card/ProductCardTwo";
import { ProductHeader } from "../../../../../apps/site/src/components/products/ProductHeader";
interface ProductThreeProps {
  data?: any;
}
export const ProductThree = ({ data }: ProductThreeProps) => {
  const cardData = data?.length > 0 ? data : [1, 2, 3, 4, 5];
  return (
    <>
      <Spaces size="xs" />
      <div className="grid gap-7">
        {cardData.map((singleData: any, index: number) => (
          <ProductCardTwo key={index} data={singleData} />
        ))}
      </div>
      <Spaces size="sm" />
    </>
  );
};
