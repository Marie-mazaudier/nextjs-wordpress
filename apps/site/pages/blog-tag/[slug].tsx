import React, { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useGetPostsByTagSlug } from "../../lib/swr-wordpress/getPosts";
import { Breadcrumb, CategoryCards, Spaces } from "@jstemplate/ecommerce-ui";
//IMPORT DATA GRAPHQL
/*Menu*/
import { HocMenuData } from "lib/graphQL/menu/HocMenuData";
const index = () => {
  const [pageData, setPageData] = useState<number>(6);
  const router = useRouter();
  const slug = router.asPath.split("/")[2];
  // ==================Get all post data using tag slug =================
  const { posts: postsGetByTags } = useGetPostsByTagSlug(slug, {
    per_page: pageData,
  });
  const handleClick = () => {
    setPageData(pageData + 6);
  };

  const tag = slug === "[slug]" ? "Tag" : slug;
  return (
    <>
      <Head>
        <title>{`${tag} | MetaShop`}</title>
        <meta name="description" content={`${slug} Page description`} />
      </Head>
      <Breadcrumb name={`TagName: ${tag}`} />
      <Spaces />
      <CategoryCards data={postsGetByTags} handleClick={handleClick} pageData={pageData} />
    </>
  );
};

export default index;

{/*

export const getStaticProps = HocMenuData(async (context) => {
  return {
    props: {

    },
  }
})*/}