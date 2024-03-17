import React from "react";
import Head from "next/head";
import { BrandData } from "../../src/data/BrandData";
import { ProductFilter } from "../../src/components/products/ProductFilter";
import { ProductHeader } from "../../src/components/products/ProductHeader";
import { filterAttribute } from "../../src/utils/productShop";
import { ShopProductsWrapper } from "../../src/components/products/ShopProductsWrapper";
import { useRecentViewedProducts } from "../../lib/woocommerce/useRecentProducts";
import { useProductsAttributes } from "../../lib/woocommerce/useAttributes";
import { useAttributeTerms } from "../../lib/woocommerce/useAttributeTerms";
import { useGetAllProducts } from "../../lib/woocommerce/useProducts";
import { useProductCategories } from "../../lib/woocommerce/useCategories";
//IMPORT DATA GRAPHQL
/*Menu*/
import { HocMenuData } from "lib/graphQL/menu/HocMenuData";
import {
  BlockLayout,
  Brands,
  HorizontalLine,
  PageContent,
  Breadcrumb,
  RecentlyViewed,
  Spaces,
  Pagination,
} from "@jstemplate/ecommerce-ui";

const ShopLeftSideBar = () => {
  // ==================Get all recently viewed products data=================
  const { recentViewData } = useRecentViewedProducts(4);

  // ==================Get all  products category data=================
  const { productCategories } = useProductCategories();
  const filterCategories = productCategories?.filter((item: any) => item.name != "Uncategorized");

  // ----------------------------------------------------------------------------
  const [currentPage, setCurrentPage] = React.useState(0);
  const [filterOpen, setFilterOpen] = React.useState(false);
  const [productActive, setProductActive] = React.useState(0);
  const [pageLimit, setPageLimit] = React.useState(5);
  const [productSort, setProductSort] = React.useState("date");
  const [priceRange, setPriceRange] = React.useState([0, 999]);
  const [colorAttribute, setColorAttribute] = React.useState("");
  const totalProductCount = 16;
  const totalProductShow = pageLimit * (currentPage + 1);

  // ==================starts product color attribute=================
  //this is color attribute name we have given at WP
  const colorAttributeName = "color";

  //get all the attributes list
  const { attributes } = useProductsAttributes();

  //filter the color attribute from attributes list
  const sortColorAttribute = filterAttribute(attributes, colorAttributeName);

  //get the color attribute terms
  const { attributeTerms: colorAttributeData } = useAttributeTerms(sortColorAttribute?.id);

  const attributeQuery = colorAttribute ? { attribute: "pa_color", attribute_term: Number(colorAttribute) } : {};
  // ==================ends product color attribute=================

  // ==================Get all-products data=================
  const { products: allProductsData, isLoading: allProductsLoading } = useGetAllProducts({
    per_page: Number(pageLimit),
    page: currentPage + 1,
    orderby: `${productSort}`,
    order: "asc",
    min_price: priceRange[0],
    max_price: priceRange[1],
    ...attributeQuery,
  });

  const handlePageChange = (data: any) => {
    setCurrentPage(data.selected);
  };

  const isEmptyData = allProductsData?.length < 1 && !allProductsLoading;
  const showPagination = !allProductsLoading && !isEmptyData;

  return (
    <>
      <Head>
        <title>Shop Left Sidebar | MetaShop</title>
        <meta name="description" content="Shop Left Sidebar Page description" />
      </Head>
      <Breadcrumb name={`Shop Left Sidebar`} />
      <Spaces size="md" />
      <BlockLayout Reverse="no">
        <ProductFilter
          filterOpen={filterOpen}
          setFilterOpen={setFilterOpen}
          categorydata={filterCategories}
          setPriceRange={setPriceRange}
          colorAttributeData={colorAttributeData}
          setColorAttribute={setColorAttribute}
        />
        <PageContent>
          <ProductHeader
            filterOpen={filterOpen}
            setFilterOpen={setFilterOpen}
            setSort={setProductSort}
            totalProductShow={totalProductShow}
            totalProductCount={totalProductCount}
          />
          <Spaces size="xs" />
          <ShopProductsWrapper
            productActive={productActive}
            allProductsData={allProductsData}
            allProductsLoading={allProductsLoading}
          />
          {showPagination && (
            <Pagination totalCount={totalProductCount} showPerPage={pageLimit} handlePageChange={handlePageChange} />
          )}
        </PageContent>
      </BlockLayout>
      <Spaces />
      <HorizontalLine />
      <Spaces />
      {recentViewData?.length > 0 && <RecentlyViewed title="Recently Viewed" data={recentViewData} />}
      <Spaces />
      <Brands data={BrandData} />
      <Spaces />
    </>
  );
};

export default ShopLeftSideBar;


export const getStaticProps = HocMenuData(async (context) => {
  return {
    props: {

    },
  }
})