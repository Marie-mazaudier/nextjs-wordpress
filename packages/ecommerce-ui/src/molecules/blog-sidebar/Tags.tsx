import React from "react";
import { BodyText } from "../../atoms/typography/bodyText/BodyText";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";

interface TagsProps {
  title?: string;
  data?: any;
}

export const Tags = ({ title, data }: TagsProps) => {
  const cardData = data?.length > 0 ? data : [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <div className="border rounded-2xl p-7">
      <BodyText size="xl" intent="medium" className="text-thmeBlackLight mb-6 capitalize">
        {title}
      </BodyText>
      <div className="flex flex-wrap items-center gap-4 mt-7">
        {cardData.map((item: any, index: number) => (
          <Link key={index} href={`/blog-tag/${item.slug}`}>
            {item?.name ? (
              <BodyText className="text-themeGraylight border px-5 py-1.5 capitalize rounded-2xl hover:text-themePrimary600 transition hover:duration-700">
                {item.name}
              </BodyText>
            ) : (
              <Skeleton height={30} width={100} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};
