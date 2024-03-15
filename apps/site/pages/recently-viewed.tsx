import React from "react";
import Head from "next/head";
import { useRecentViewedProducts } from "../lib/woocommerce/useRecentProducts";
import { Breadcrumb, TrendingProductCard } from "@jstemplate/ecommerce-ui";
//IMPORT DATA GRAPHQL
/*Menu*/
import { HocMenuData } from "lib/graphQL/menu/HocMenuData";
const RecentlyViewed = () => {
  // ==================Get recently viewed products  data=================
  const { recentViewData } = useRecentViewedProducts(12);
  const cardData = recentViewData?.length > 0 ? recentViewData : [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <section>
      <Head>
        <title>Recently Viewed Page | MetaShop</title>
        <meta name="description" content="Recently Viewed Page description" />
      </Head>
      <Breadcrumb />
      <div className="my-14 lg:my-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 lg:gap-7 justify-items-center container mx-auto">
        {cardData.slice(0, 12).map((singleData: any, index: number) => (
          <TrendingProductCard key={index} data={singleData} />
        ))}
      </div>
    </section>
  );
};

export default RecentlyViewed;

export const getStaticProps = HocMenuData(async (context) => {
  return {
    props: {

    },
  }
})