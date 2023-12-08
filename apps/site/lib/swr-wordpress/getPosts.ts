import moment from "moment";
import useSWR from "swr";
import { fetcher } from "../utils/fetcher.utils";


// *************** get post by slug ***************

/**
 * get post group by post slug
 * @param slug post slug as string and fallback data
 * @returns | { data ,isLoading, isError}
 */
export const useGetPost = (slug: any, dataPre?: any) => {
  // fetch posts from the API
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/wp-json/wp/v2/posts?slug=${slug}&_embed`,
    fetcher,
    {
      fallbackData: [],
    }
  );

  if (data && !error && data.length > 0) {
    // filter out posts only allow title. excerpt, and featured image, author, and date
    const post = data?.map((post: any) => ({
      id: post.id,
      title: post.title.rendered,
      slug: post.slug,
      featuredmedia: {
        sourceUrl: post?._embedded?.["wp:featuredmedia"][0]?.source_url || "",
        alt: post?._embedded?.["wp:featuredmedia"][0]?.alt_text || "",
      },
      author: post?._embedded?.author[0]?.name,
      authorId: post?._embedded?.author[0]?.id,
      category: post?._embedded?.["wp:term"][0],
      tags: post?._embedded?.["wp:term"][1],
      publishTime: post?.date,
      avatar: post?._embedded?.author?.[0]?.avatar_urls[96],
      content: post?.content?.rendered,
    }));
    return {
      post,
      isLoading: !error && !data,
      isError: error,
    };
  }
  return {
    post: [],
    isLoading: true,
    isError: error,
  };
};

//////// get posts group by category slug ////////

const staticquery = {
  per_page: 10,
};

/**
 * get posts group by category slug
 * @param slug category slug as string
 * @param query perpage data as object
 * @returns | { data ,isLoading, isError}
 */
export const usePostsByCatSlug = (slug: string, query?: any) => {
  const { data: categoryName } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/wp-json/wp/v2/categories?slug=${slug}}`,
    fetcher,
    {
      fallbackData: [],
    }
  );
  return usePostsByCatId(categoryName?.[0]?.id, query);
};

/**
 * get posts group by category id
 * @param id category id as number
 * @returns | { data ,isLoading, isError}
 */
export const usePostsByCatId = (id: number, query?: any) => {
  const finalQury = query ? query : staticquery;
  // map the query object to use on api url
  const queryStr =
    Object.keys(finalQury)
      .map((key) => `${key}=${finalQury[key]}`)
      .join("&") || "";

  const { data: postsById, error: postError } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/wp-json/wp/v2/posts?categories=${id}&${queryStr}&_embed`,
    fetcher,
    {
      fallbackData: [],
    }
  );

  if (postsById && !postError && postsById.length > 0) {
    const postsByCategory = postsById?.map((post: any) => ({
      id: post.id,
      title: post.title.rendered,
      slug: post.slug,
      featuredmedia: {
        sourceUrl: post?._embedded?.["wp:featuredmedia"][0]?.source_url || "",
        alt: post?._embedded?.["wp:featuredmedia"][0]?.alt_text || "",
      },
      author: post?._embedded?.author[0]?.name,
      authorId: post?._embedded?.author[0]?.id,
      category: post?._embedded?.["wp:term"][0],
      publishTime: post?.date,
      avatar: post?._embedded?.author?.[0]?.avatar_urls[96],
      content: post?.content?.rendered,
    }));
    return {
      data: postsByCategory,
      isLoading: !postError && !postsById,
      isError: postError,
    };
  }
  return {
    data: [],
    isLoading: !postError && !postsById,
    isError: postError,
  };
};

//////// get posts by search query ////////

/**
 * get posts group by search keywords
 * @param query search text as string
 * @returns | { data ,isLoading, isError}
 */

export const usePostsBySearch = (search?: any, query?: any) => {
  const finalQury = query ? query : staticquery;
  const queryStr =
    Object.keys(finalQury)
      .map((key) => `${key}=${finalQury[key]}`)
      .join("&") || "";

  const { data: postsBySearch, error: searchError } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/wp-json/wp/v2/posts?search=${search}&${queryStr}&_embed`,
    fetcher,
    {
      keepPreviousData: true,
    }
  );
  if (postsBySearch && !searchError && postsBySearch.length > 0) {
    const posts = postsBySearch?.map((post: any) => ({
      id: post.id,
      title: post.title.rendered,
      slug: post.slug,
      featuredmedia: {
        sourceUrl: post?._embedded?.["wp:featuredmedia"][0]?.source_url || "",
        alt: post?._embedded?.["wp:featuredmedia"][0]?.alt_text || "",
      },
      content: post?.content?.rendered,
      author: post?._embedded?.author[0]?.name,
      publishTime: post?.date,
    }));
    return {
      data: posts,
      isLoading: !searchError && !postsBySearch,
      isError: searchError,
    };
  }
  return {
    data: [],
    isLoading: !searchError && !postsBySearch,
    isError: searchError,
  };
};

// *************** get post by tag slug ***************

/**
 * get post group by post slug
 * @param slug tags slug as string, optional per_page query object for pagination
 * @returns | { data ,isLoading, isError}
 */
export const useGetPostsByTagSlug = (slug: string, query: any) => {
  const { data: tagName } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/wp-json/wp/v2/tags?slug=${slug}`, fetcher, {
    fallbackData: [],
  });
  const getDataByTagId = useGetPostsByTagsId(tagName?.[0]?.id, query);
  return getDataByTagId;
};

export const useGetPostsByTagsId = (id: number, query: any) => {
  const finalQury = query ? query : staticquery;
  // map the query object to use on api url
  const queryStr =
    Object.keys(finalQury)
      .map((key) => `${key}=${finalQury[key]}`)
      .join("&") || "";

  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/wp-json/wp/v2/posts?tags=${id}&${queryStr}&_embed`,
    fetcher,
    {
      fallbackData: [],
    }
  );

  if (data && !error && data.length > 0) {
    // filter out posts only allow title. excerpt, and featured image, author, and date
    const posts = data?.map((post: any) => ({
      id: post.id,
      title: post.title.rendered,
      slug: post.slug,
      featuredmedia: {
        sourceUrl: post?._embedded?.["wp:featuredmedia"][0]?.source_url || "",
        alt: post?._embedded?.["wp:featuredmedia"][0]?.alt_text || "",
      },
      author: post?._embedded?.author[0]?.name,
      authorId: post?._embedded?.author[0]?.id,
      authorSlug: post?._embedded?.author[0]?.slug,
      category: post?._embedded?.["wp:term"][0],
      publishTime: post?.date,
      avatar: post?._embedded?.author?.[0]?.avatar_urls[96],
      content: post?.content?.rendered,
    }));
    return {
      posts,
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


// *************** get all posts By date ***************

/**
 * get all available categories
 * @returns | { data ,isLoading, isError}
 */

export const useGetAllPostsByDate = (slug:any) => {
  const date = moment(`${slug}`).format().split("+")[0];
  const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/wp-json/wp/v2/posts?after=${date}`, fetcher);

  return {
    isLoading: true,
    isError: error,
    data: data,
  };
};



// *************** get post by author id ***************

/**
 * get post group by author id
 * @param id author id as a number, optional per_page query object for pagination
 * @returns | { data ,isLoading, isError}
 */
export const useGetPostsByAuthorId = (id: any, query?: any) => {
  const finalQuery = query ? query : staticquery;
  // map the query object to use on api url
  const queryStr =
    Object.keys(finalQuery)
      .map(key => `${key}=${finalQuery[key]}`)
      .join('&') || ''
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/wp-json/wp/v2/posts?author=${id}&${queryStr}&_embed`,
    fetcher
  );

  if (data && !error && data.length > 0) {
    // filter out posts only allow title. excerpt, and featured image, author, and date
    const posts = data?.map((post: any) => ({
      id: post.id,
      title: post.title.rendered,
      slug: post.slug,
      featuredmedia: {
        sourceUrl: post?._embedded?.['wp:featuredmedia'][0]?.source_url || '',
        alt: post?._embedded?.['wp:featuredmedia'][0]?.alt_text || ''
      },
      author: post?._embedded?.author[0]?.name,
      authorId: post?._embedded?.author[0]?.id,
      authorSlug: post?._embedded?.author[0]?.slug,
      category: post?._embedded?.['wp:term'][0],
      publishTime: post?.date,
      avatar: post?._embedded?.author?.[0]?.avatar_urls[96],
      content: post?.content?.rendered
    }))
    return {
      posts,
      isLoading: !error && !data,
      isError: error
    }
  }
  return {
    posts: [],
    isLoading: true,
    isError: error
  }
}