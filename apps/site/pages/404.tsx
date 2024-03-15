import React from "react";
import Head from "next/head";
import { BlockLayout, Contact404, Header404, Spaces } from "@jstemplate/ecommerce-ui";
//IMPORT DATA GRAPHQL
/*Menu*/
import { HocMenuData } from "lib/graphQL/menu/HocMenuData";
const NotFound404 = () => {
  return (
    <>
      <Head>
        <title>Not Found | MetaShop</title>
        <meta name="description" content="Not Found Page description" />
      </Head>
      <Spaces />
      <BlockLayout>
        <Header404 />
        <Contact404 />
      </BlockLayout>
      <Spaces />
    </>
  );
};

export default NotFound404;


export const getStaticProps = HocMenuData(async (context) => {
  return {
    props: {

    },
  }
})