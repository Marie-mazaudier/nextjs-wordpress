import React from "react";
import Head from "next/head";
import { BlockLayout, Contact404, Header404, Spaces } from "@jstemplate/ecommerce-ui";
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
