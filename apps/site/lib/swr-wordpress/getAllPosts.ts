/**
 * get all post data from wordpress.
 *
 * @since 2.6.0
 *
 * @param object options
 * @param mixed  $data The data value to add.
 * @return object .

*/

import useSWR from "swr";
import axios from "axios";


const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const staticquery = {
  per_page: 10,
};

export const useGetAllPosts = (query: any) => {
  // map the query object to use on api url
  const finalQuery = query ? query : staticquery;
  const queryStr =
    Object.keys(finalQuery)
      .map((key) => `${key}=${finalQuery[key]}`)
      .join("&") || "";

  // fetch posts from the API
  const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/wp-json/wp/v2/posts?_embed&${queryStr}`, fetcher, {
    fallbackData: [],
  });

  if (data && !error && data.length > 0) {
    // filter out posts only allow title, excerpt, and featured image, author, and date
    const posts = data?.map((post: any) => ({
      id: post?.id || "",
      title: post?.title?.rendered || "",
      slug: post?.slug || "",
      featuredmedia: {
        sourceUrl: post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "",
        alt: post?._embedded?.["wp:featuredmedia"]?.[0]?.alt_text || "",
      },
      author: post?._embedded?.author?.[0]?.name,
      authorId: post?._embedded?.author?.[0]?.id,
      category: post?._embedded?.["wp:term"]?.[0],
      tags: post?._embedded?.["wp:term"]?.[1],
      publishTime: post?.date,
      avatar: post?._embedded?.author?.[0]?.avatar_urls[96],
      content: post?.content?.rendered,
    }));

    // Add a conditional check to set sourceUrl and alt to empty strings if they don't exist
    const postsWithConditionalImage = posts.map((post: any) => ({
      ...post,
      featuredmedia: {
        sourceUrl: post.featuredmedia.sourceUrl || "",
        alt: post.featuredmedia.alt || "",
      },
    }));

    return {
      posts: postsWithConditionalImage,
      isLoading: !error && !data,
      isError: error,
    };
  }

  return {
    posts: [],
    isLoading: true,
    isError: error,
  };
};
