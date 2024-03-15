import React from "react";
import { useRouter } from "next/router";
import { GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";
import { useGetAllCategories } from "../../lib/swr-wordpress/getAllCategories";
import { useGetAllPosts } from "../../lib/swr-wordpress/getAllPosts";
import { useGetPost } from "../../lib/swr-wordpress/getPosts";
import { BlogContent } from "../../src/components/singleBlog/BlogContent";
import { CommentsSection } from "../../src/components/singleBlog/CommentsSection";
import { CommentsForm } from "../../src/components/comment/CommentsForm";
import { useCommentsByPostId } from "../../lib/swr-wordpress/getComments";
//IMPORT DATA GRAPHQL
/*Menu*/
import { HocMenuData } from "lib/graphQL/menu/HocMenuData";
import {
  BlockLayout,
  BlogFilter,
  RecentPosts,
  Search,
  SocialShare,
  Spaces,
  Tags,
  ArchiveFilter,
} from "@jstemplate/ecommerce-ui";

const SingleBlogPage = () => {
  const router = useRouter();
  const slug = router.asPath.split("/")[2];

  // ==================Get all post data using slug=================
  const { post } = useGetPost(slug);

  //=================Get all posts data ========================
  const { posts } = useGetAllPosts({ per_page: 8 });

  // ==================Get all category name and category count =================
  const { categories } = useGetAllCategories();

  //=================Get all comments for individual post========================
  const { data: getAllComments } = useCommentsByPostId(post[0]?.id);
  return (
    <>
      <Head>
        <title> Single Blog Page | MetaShop</title>
        <meta name="description" content="Single Blog Page description" />
      </Head>
      <Spaces size="mdd" />
      <BlockLayout>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
          <div className="lg:col-span-8">
            {post?.map((singlePost: any, index: number) => (
              <BlogContent data={singlePost} key={index} />
            ))}
            <Spaces size="md" />
            <SocialShare />
            <Spaces size="mdd" />
            <CommentsSection getAllComments={getAllComments} postID={post[0]?.id} />
            <Spaces size="md" />
            <CommentsForm postId={post[0]?.id} />
          </div>
          <div className="lg:col-span-4">
            <Search />
            <Spaces size="xss" />
            <BlogFilter title="Browse By Categories" data={categories} />
            <Spaces size="xss" />
            {/* <ArchiveFilter title="Archives" data={filterDataTwo} /> */}
            <Spaces size="xss" />
            <RecentPosts imageWidth={100} imageHeight={100} data={posts} />
            <Spaces size="xss" />
            {post?.map((singlePost: any, index: number) => (
              <Tags title="tags" data={singlePost.tags} key={index} />
            ))}
          </div>
        </div>
      </BlockLayout>
      <Spaces />
    </>
  );
};

export default SingleBlogPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wp-json/wp/v2/posts?_embed`);
  const data = await res.json();
  const paths = data?.map((post: any) => ({
    params: { slug: post.slug.toString() },
  }));
  return {
    paths,
    fallback: true, // can also be true or 'blocking'
  };
};

export const getStaticProps: GetStaticProps = HocMenuData(async (context) => {
  const slug = context?.params?.slug;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wp-json/wp/v2/posts?slug=${slug}&_embed`);
  const post = await res.json();

  return {
    props: {
      postDataPre: post ?? null,
    },
    revalidate: 60,
  };

})

