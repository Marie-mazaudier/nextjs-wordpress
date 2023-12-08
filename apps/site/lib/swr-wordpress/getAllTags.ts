import moment from "moment";
import useSWR from "swr";
import { fetcher } from "../utils/fetcher.utils";


// *************** get all tags ***************

/**
 * get all available tag
 * @param tagpre you can add prefatch tag as predata (optional)
 * @returns | { tags ,isLoading, isError}
 */
export const useGetTags = (tagsPre?: any) => {
  const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/wp-json/wp/v2/tags`, fetcher, {
    fallbackData: tagsPre,
  });
  if (data && !error && data.length > 0) {
    // filter out posts only allow title. excerpt, and featured image, author, and date
    const tags = data?.map((tag: any) => ({
      id: tag.id,
      name: tag.name,
      slug: tag.slug,
    }));
    return {
      tags,
      isLoading: !error && !data,
      isError: error,
    };
  }
  return {
    tags: [],
    isLoading: true,
    isError: error,
  };
};

