import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useAllProductsByCategoryId } from "../../lib/woocommerce/useProductByCategoryId";
import { useProductCategories } from "../../lib/woocommerce/useCategories";
import { EmptyDataFound } from "../../src/components/emptyData/EmptyDataFound";
import { BlockLayout, Breadcrumb, Pagination, ProductCardOne, Spaces } from "@jstemplate/ecommerce-ui";

const Category = () => {
  const [currentPage, setCurrentPage] = React.useState(0);
  const [pageLimit, setPageLimit] = React.useState(5);
  const totalProductCount = 16;
  const router = useRouter();
  const id = router.asPath.split("/")[2];

  // ==================Get all products data using category id=================
  const { catproducts, isLoading } = useAllProductsByCategoryId(id, {
    per_page: Number(pageLimit),
    page: currentPage + 1,
  });
  // ==================Get all products category data =================
  const { productCategories } = useProductCategories();
  const filterCategories = productCategories?.filter((item: any) => item.id == `${id}`);
  const cardData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const handlePageChange = (data: any) => {
    setCurrentPage(data.selected);
  };

  return (
    <>
      <Head>
        <title>Category page | MetaShop</title>
        <meta name="description" content="Category page description" />
      </Head>
      {filterCategories?.map((singleData: any, index: number) => (
        <div key={index}>
          <Breadcrumb name={`Category: ${singleData.name}`} />
        </div>
      ))}

      <Spaces size="md" />
      <BlockLayout>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 justify-items-center">
            {isLoading &&
              cardData.map((singleData: any, index: number) => <ProductCardOne key={index} data={singleData} />)}
          </div>
          {isLoading ||
            (!isLoading && catproducts.length == 0 && (
              <EmptyDataFound message="No Products Available at This Category" />
            ))}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 justify-items-center">
            {catproducts.length > 0 &&
              catproducts.map((singleData: any, index: number) => <ProductCardOne key={index} data={singleData} />)}
          </div>
          <div className=" flex items-center justify-center w-full">
            {!isLoading && catproducts.length != 0 && (
              <Pagination totalCount={totalProductCount} showPerPage={pageLimit} handlePageChange={handlePageChange} />
            )}
          </div>
        </div>
        <Spaces size="sm" />
      </BlockLayout>
      <Spaces />
    </>
  );
};

export default Category;