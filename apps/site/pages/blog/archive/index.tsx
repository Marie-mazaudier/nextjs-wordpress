import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { useGetAllPostsByDate } from "../../../lib/swr-wordpress/getPosts";
import { Breadcrumb, CategoryCards, Spaces } from "@jstemplate/ecommerce-ui";
//IMPORT DATA GRAPHQL
/*Menu*/
import { HocMenuData } from "lib/graphQL/menu/HocMenuData";
const index = () => {
  const router = useRouter();
  const slug = router.asPath.split("=")[1];

  // ==================Get all post data using date slug=================
  const { data } = useGetAllPostsByDate(slug);

  return (
    <div>
      <Head>
        <title>Archive Page | MetaShop</title>
        <meta name="description" content="Archive Page description" />
      </Head>
      <Breadcrumb name={`Archive: ${slug}`} />
      <Spaces />
      <CategoryCards />
    </div>
  );
};

export default index;


export const getStaticProps = HocMenuData(async (context) => {
  return {
    props: {

    },
  }
})