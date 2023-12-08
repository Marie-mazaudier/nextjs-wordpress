import useSWR from "swr";
import { fetcher } from "../utils/fetcher.utils";

//////// get all comments by post id ////////
/**
 * get comments by post id
 * @param id post id as number
 * @returns | { data ,isLoading, isError}
 */

export const useCommentsByPostId = (id: number) => {
  const { data: commentsById, error: commentError } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/wp-json/wp/v2/comments?post=${id}&parent=0`,
    fetcher
  );

  if (commentsById && !commentError && commentsById.length > 0) {
    const commentsByPost = commentsById?.map((comment: any) => ({
      id: comment.id,
      author: comment.author_name,
      authorId: comment.author,
      content: comment.content.rendered,
      publishTime: comment.date,
      avatar: comment.author_avatar_urls[96],
    }));
    return {
      data: commentsByPost,
      isLoading: !commentError && !commentsById,
      isError: commentError,
    };
  }
  return {
    data: [],
    isLoading: !commentError && !commentsById,
    isError: commentError,
  };
};
