import React from "react";
import { CommentItem } from "./CommentItem";

interface CommentsProps {
  getAllComments?: any;
  postID?: any;
}

export const CommentsSection = ({ getAllComments, postID }: CommentsProps) => {
  return (
    <section className="relative mt-10">
      <div className="relative flex items-center">
        <hr className="w-full border-t border-themeWhite" />
        <p className="absolute left-0 right-0 px-4 py-2 mx-auto font-sans text-base font-semibold rounded text-themeSecondary w-fit bg-themeSecondary100">
          {getAllComments?.length ? getAllComments?.length : 0}
        </p>
      </div>

      {getAllComments?.map((item: any, index: number) => (
        <CommentItem key={index} item={item} postID={postID} />
      ))}
    </section>
  );
};