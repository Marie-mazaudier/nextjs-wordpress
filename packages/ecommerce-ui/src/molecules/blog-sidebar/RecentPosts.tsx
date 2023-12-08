import React from "react";
import { Placeholder } from "../../atoms/placeholder/Placeholder";
import { BodyText } from "../../atoms/typography/bodyText/BodyText";
import { Heading3 } from "../../atoms/typography/headingText/heading3";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";

interface RecentPostsProps {
  data?: any;
  imageWidth?: number;
  imageHeight?: number;
}

export const RecentPosts = ({ data, imageWidth, imageHeight }: RecentPostsProps) => {
  const cardData = data?.length > 0 ? data : [1, 2, 3];
  return (
    <>
      <Heading3 intent="semibold" className="text-thmeBlackLight mb-6">
        Recent Posts
      </Heading3>
      {cardData.slice(0, 3).map((singleData: any, index: number) => (
        <div key={index} className="flex gap-5 items-center  border rounded-2xl p-3 mb-4">
          {singleData?.featuredmedia?.sourceUrl ? (
            <div className="sm:shrink-0">
              <Placeholder
                src={singleData.featuredmedia.sourceUrl}
                alt={singleData.featuredmedia.alt}
                imageWidth={imageWidth}
                imageHeight={imageHeight}
                className="rounded-xl"
              />
            </div>
          ) : (
            <Skeleton height={100} width={100} />
          )}
          <div>
            {singleData?.title ? (
              <Link href={`/blog/${singleData.slug}`}>
                <BodyText
                  intent="medium"
                  size="md"
                  className="text-thmeBlackLight line-clamp-2 hover:text-themePrimary600 transition hover:duration-700"
                >
                  {singleData?.title}
                </BodyText>
              </Link>
            ) : (
              <Skeleton height={30} width={100} />
            )}
            {singleData?.author ? (
              <BodyText className="text-themeGraylight mt-2">
                By:{" "}
                <Link href={`/author/${singleData?.authorId}`} className="text-themePrimary600">
                  {singleData.author}
                </Link>
              </BodyText>
            ) : (
              <div className=" mt-2">
                <Skeleton height={20} width={200} />
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
};
