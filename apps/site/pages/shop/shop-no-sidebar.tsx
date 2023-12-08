import React from "react";
import Head from "next/head";
import { ProductHeader } from "../../src/components/products/ProductHeader";
import { BrandData } from "../../src/data/BrandData";
import { ShopProductWarperTwo } from "../../src/components/products/ShopProductWarperTwo";
import { useRecentViewedProducts } from "../../lib/woocommerce/useRecentProducts";
import { useGetAllProducts } from "../../lib/woocommerce/useProducts";
import {
  BlockLayout,
  Brands,
  HorizontalLine,
  Breadcrumb,
  RecentlyViewed,
  Spaces,
  Pagination,
} from "@jstemplate/ecommerce-ui";

const ShopNoSidebar = () => {
  // ==================Get all recently viewed products data=================
  const { recentViewData } = useRecentViewedProducts(4);

  // ----------------------------------------------------------------------------
  const [filterOpen, setFilterOpen] = React.useState(false);
  const [productActive, setProductActive] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [pageLimit, setPageLimit] = React.useState(12);
  const [productSort, setProductSort] = React.useState("date");
  const totalProductCount = 16;
  const totalProductShow = pageLimit * (currentPage + 1);

  // ==================Get all-products data=================
  const { products: allProductsData, isLoading: allProductsLoading } = useGetAllProducts({
    per_page: Number(pageLimit),
    page: currentPage + 1,
    orderby: `${productSort}`,
    order: "asc",
  });
  const handlePageChange = (data: any) => {
    setCurrentPage(data.selected);
  };

  const isEmptyData = allProductsData?.length < 1 && !allProductsLoading;
  const showPagination = !allProductsLoading && !isEmptyData;
  return (
    <>
      <Head>
        <title>Shop No Sidebar | MetaShop</title>
        <meta name="description" content="Shop No Sidebar Page description" />
      </Head>
      <Breadcrumb name={`Shop No Sidebar`} />
      <Spaces size="md" />
      <ProductHeader
        filterOpen={filterOpen}
        setFilterOpen={setFilterOpen}
        setpage={setPageLimit}
        setSort={setProductSort}
        productActive={productActive}
        setProductActive={setProductActive}
        totalProductShow={totalProductShow}
        totalProductCount={totalProductCount}
      />
      <BlockLayout>
        <ShopProductWarperTwo
          productActive={productActive}
          allProductsData={allProductsData}
          allProductsLoading={allProductsLoading}
        />
        {showPagination && (
          <Pagination totalCount={totalProductCount} showPerPage={pageLimit} handlePageChange={handlePageChange} />
        )}
        <Spaces />
        <HorizontalLine />
        <Spaces />
        {recentViewData?.length > 0 && <RecentlyViewed title="Recently Viewed" data={recentViewData} />}
        <Spaces />
        <Brands data={BrandData} />
        <Spaces />
      </BlockLayout>
    </>
  );
};

export default ShopNoSidebar;
