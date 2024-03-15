import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useProduct } from "../../../lib/woocommerce/useProduct";
import { useRecentViewedProducts } from "../../../lib/woocommerce/useRecentProducts";
import { getRecentlyViewed } from "../../../src/utils/products.utils";
import { ProductDetails } from "../../../src/components/productDescription/ProductDetails";
import { ProductDescription } from "../../../src/components/productDescription/ProductDescription";
import { ProductsData } from "../../../src/data/ProductsDetails";
import { BrandData } from "../../../src/data/BrandData";
import { Brands, RecentlyViewed, Spaces } from "@jstemplate/ecommerce-ui";
//IMPORT DATA GRAPHQL
/*Menu*/
import { HocMenuData } from "lib/graphQL/menu/HocMenuData";
const Product = () => {
  const router = useRouter();
  const slug = router?.query?.slug;
  // ==================Get all  products data using slug =================
  const { product, isLoading } = useProduct(slug);

  // ==================Get all recently viewed products data=================
  const { recentViewData } = useRecentViewedProducts(4);
  // console.log(product)
  if (product[0]?.id) {
    getRecentlyViewed(product[0]?.id);
  }

  return (
    <>
      <Head>
        <title>Single-Page | MetaShop</title>
        <meta name="description" content="single page description" />
      </Head>
      <Spaces size="mdd" />
      <ProductDetails isLoading={isLoading} data={product} />
      <Spaces size="mdd" />
      <ProductDescription isLoading={isLoading} data={product} productInfo={ProductsData} />
      <Spaces size="mdd" />
      {recentViewData?.length > 0 && <RecentlyViewed title="Recently Viewed" data={recentViewData} />}
      <Spaces size="mdd" />
      <Brands data={BrandData} />
      <Spaces size="mdd" />
    </>
  );
};

export default Product;


export const getStaticProps = HocMenuData(async (context) => {
  return {
    props: {

    },
  }
})