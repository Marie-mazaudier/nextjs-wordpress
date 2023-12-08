import React from "react";
import { Avatar, BodyText } from "@jstemplate/ecommerce-ui";
import Rating from "react-rating";
import { HiStar } from "react-icons/hi2";

interface ReviewCardProps {
  data: any;
}

export const ReviewCard = ({ data }: ReviewCardProps) => {
  const repliceContent = data?.content?.replace(/<p>/g, "").replace(/<\/p>/g, "");
  return (
    <section className="p-4 bg-white rounded-2xl w-full">
      <div className=" flex items-center gap-4 mb-4">
        <Avatar size="xxl" src="/image/avatar.png" />
        <div>
          <BodyText size="xl" intent="medium" className=" text-themeSecondary800">
            {data?.name}
          </BodyText>
          <div className="flex gap-0.5 mt-1">
            {/* @ts-ignore */}
            <Rating
              readonly
              initialRating={data?.rating}
              emptySymbol={<HiStar className="text-themeSecondary300 h-4 w-4" />}
              fullSymbol={<HiStar className="text-themeWarning500 h-4 w-4" />}
            />
          </div>
        </div>
      </div>
      <BodyText size="lg" className=" text-themeSecondary500">
        {repliceContent}
      </BodyText>
    </section>
  );
};
