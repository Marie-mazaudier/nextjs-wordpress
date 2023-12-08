import { ProductFour, ProductTwo } from "@jstemplate/ecommerce-ui";
import React from "react";
import { EmptyDataFound } from "../emptyData/EmptyDataFound";

interface ShopProductWarperTwoProps {
  productActive?: any;
  allProductsData?: any;
  allProductsLoading?: boolean;
}

export const ShopProductWarperTwo = ({
  productActive,
  allProductsData,
  allProductsLoading,
}: ShopProductWarperTwoProps) => {
  const isEmptyData = allProductsData?.length < 1 && !allProductsLoading;
  const productGridView = productActive === 0 && !isEmptyData;
  const productListView = productActive === 1 && !isEmptyData;
  return (
    <div>
      {(productGridView && <ProductTwo data={allProductsData} />) ||
        (productListView && <ProductFour data={allProductsData} />)}
      {isEmptyData && (
        <div className="py-10">
          <EmptyDataFound message="No Products Available" />
        </div>
      )}
    </div>
  );
};
