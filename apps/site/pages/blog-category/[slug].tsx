import React, { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { usePostsByCatSlug } from "../../lib/swr-wordpress/getPosts";
import { Breadcrumb, CategoryCards, Spaces } from "@jstemplate/ecommerce-ui";
//IMPORT DATA GRAPHQL
/*Menu*/
import { HocMenuData } from "lib/graphQL/menu/HocMenuData";
const Category = () => {
  const [pageData, setPageData] = useState<number>(6);
  const router = useRouter();
  const slug = router.asPath.split("/")[2];
  // ==================Get all post data using category slug =================
  const { data: categoryData } = usePostsByCatSlug(`${slug}`, {
    per_page: pageData,
  });
  const handleClick = () => {
    setPageData(pageData + 6);
  };
  const category = slug === "[slug]" ? "Category" : slug;
  return (
    <>
      <Head>
        <title>{`${category} | MetaShop`}</title>
        <meta name="description" content="Blog Category Page description" />
      </Head>
      <Breadcrumb name={`Category: ${category}`} />
      <Spaces />
      <CategoryCards data={categoryData} handleClick={handleClick} pageData={pageData} />
    </>
  );
};

export default Category;

export const getStaticProps = HocMenuData(async (context) => {
  return {
    props: {

    },
  }
})