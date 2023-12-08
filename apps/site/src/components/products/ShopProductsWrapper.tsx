import { ProductOne, ProductThree } from "@jstemplate/ecommerce-ui";
import React from "react";
import { EmptyDataFound } from "../emptyData/EmptyDataFound";

interface ShopProductsWrapperProps {
  productActive?: any;
  allProductsData?: any;
  allProductsLoading?: boolean;
}

export const ShopProductsWrapper = ({
  productActive,
  allProductsData,
  allProductsLoading,
}: ShopProductsWrapperProps) => {
  const isEmptyData = allProductsData?.length < 1 && !allProductsLoading;
  const productGridView = productActive === 0 && !isEmptyData;
  const productListView = productActive === 1 && !isEmptyData;
  return (
    <div>
      {(productGridView && <ProductOne data={allProductsData} />) ||
        (productListView && <ProductThree data={allProductsData} />)}
      {isEmptyData && (
        <div className="py-10">
          <EmptyDataFound message="No Products Available" />
        </div>
      )}
    </div>
  );
};
