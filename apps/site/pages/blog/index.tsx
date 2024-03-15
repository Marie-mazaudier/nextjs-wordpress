import Head from "next/head";
import React, { useState } from "react";
import { useGetAllCategories } from "../../lib/swr-wordpress/getAllCategories";
import { useGetAllPosts } from "../../lib/swr-wordpress/getAllPosts";
import { useGetTags } from "../../lib/swr-wordpress/getAllTags";
import { BreadcrumbTwo, BlockLayout, BlogLayout, Spaces } from "@jstemplate/ecommerce-ui";
//IMPORT DATA GRAPHQL
/*Menu*/
import { HocMenuData } from "lib/graphQL/menu/HocMenuData";
const Blog = () => {
  const [pageData, setPageData] = useState<number>(6);
  const handleClick = () => {
    setPageData(pageData + 6);
  };
  //=================Get all posts data ========================
  const { posts } = useGetAllPosts({ per_page: pageData });
  console.log(posts)
  //================= Get all category name and count ========================
  const { categories } = useGetAllCategories();

  //================= Get all available tags  ========================
  const { tags } = useGetTags();

  return (
    <>
      <Head>
        <title>Blog Page | MetaShop</title>
        <meta name="description" content="Blog Page description" />
      </Head>
      <BreadcrumbTwo />
      <Spaces size="mdd" />
      <BlockLayout>
        <BlogLayout
          data={posts}
          categoryData={categories}
          tagData={tags}
          handleClick={handleClick}
          pageData={pageData}
        />
      </BlockLayout>
      <Spaces />
    </>
  );
};

export default Blog;

export const getStaticProps = HocMenuData(async (context) => {
  return {
    props: {

    },
  }
})