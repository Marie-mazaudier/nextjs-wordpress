import React from "react";
import Link from "next/link";
import { Badge } from "../../atoms/badges/Badge";
import { Placeholder } from "../../atoms/placeholder/Placeholder";
import { BodyText } from "../../atoms/typography/bodyText/BodyText";
import { Heading3 } from "../../atoms/typography/headingText/heading3";
import { Ratings } from "../../atoms/ratings/Ratings";
import Skeleton from "react-loading-skeleton";
import Rating from "react-rating";
import { HiStar } from "react-icons/hi2";


interface ProductCardTwoProps {
  data?: any;
}

export const ProductCardTwo = ({ data }: ProductCardTwoProps) => {

  const repliceContent = data?.short_description?.replace(/<p>/g, "").replace(/<\/p>/g, "");

  return (
    <div className="flex flex-wrap md:flex-nowrap gap-5 xl:gap-10 items-center border border-themeSecondary200 p-6 rounded-3xl justify-center">
      <div className="p-4 bg-themeSecondary100 rounded-xl relative md:shrink-0">
        {data.image ? (
          data?.image
            ?.slice(0, 1)
            .map((image: any, index: number) => (
              <Placeholder
                className="w-full"
                key={index}
                src={image?.src}
                imageWidth={245}
                imageHeight={245}
                alt={image?.alt}
              />
            ))
        ) : (
          <Skeleton height={245} width={245} />
        )}

        {data?.discount ? (
          <Badge size="md" type="pill" className="absolute top-4 right-3 rounded-full">
            {data.discount.toFixed(0)}%
          </Badge>
        ) : (
          ""
        )}
      </div>
      <div>
        {data?.name ? (
          <Link href={`/shop/product/${data?.slug}`}>
            <Heading3
              className="text-themeSecondary800 line-clamp-1 hover:text-themePrimary600  transition hduration-300 ease-in-out"
              intent="bold"
            >
              {data.name}
            </Heading3>
          </Link>
        ) : (
          <div className="mt-5">
            <Skeleton height={32} />
          </div>
        )}
        {data?.short_description ? (
          <BodyText size="lg" className="text-themeSecondary500 mt-3 line-clamp-3">
            {repliceContent}
          </BodyText>
        ) : (
          <div className=" mt-3">
            <Skeleton width={340} count={3} />
          </div>
        )}

        {/* Logique mise à jour pour gérer les prix soldés et réguliers */}
        <div className="flex items-center gap-2 mt-3">
          {data?.sale_price ? (
            <>
              <BodyText size="xl" className="text-themePrimary600">
                ${data.sale_price}
              </BodyText>
              <BodyText size="sm" className="text-themeSecondary400 line-through">
                ${data.regular_price}
              </BodyText>
            </>
          ) : data?.regular_price ? (
            <BodyText size="xl" className="text-themePrimary600">
              ${data.regular_price}
            </BodyText>
          ) : (
            <Skeleton height={20} width={140} />
          )}
        </div>
        {data?.rating ? (
          <div className="flex items-center gap-2 mt-3">
            {/* @ts-ignore */}
            <Rating
              readonly
              initialRating={data?.rating}
              emptySymbol={<HiStar className="text-themeSecondary300 h-4 w-4" />}
              fullSymbol={<HiStar className="text-themeWarning500 h-4 w-4" />}
            />
            <BodyText size="sm" className="text-themeSecondary400 mb-0.5">
              (2)
            </BodyText>
          </div>
        ) : (
          <Skeleton height={12} width={140} />
        )}
      </div>
    </div>
  );
};
