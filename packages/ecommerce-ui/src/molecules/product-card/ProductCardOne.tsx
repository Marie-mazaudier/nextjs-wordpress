import Link from "next/link";
import React from "react";
import { Badge } from "../../atoms/badges/Badge";
import { Placeholder } from "../../atoms/placeholder/Placeholder";
import { Ratings } from "../../atoms/ratings/Ratings";
import { BodyText } from "../../atoms/typography/bodyText/BodyText";
import Skeleton from "react-loading-skeleton";
import { HiStar } from "react-icons/hi2";
import Rating from "react-rating";

interface ProductCardOneProps {
  data?: any;
}

export const ProductCardOne = ({ data }: ProductCardOneProps) => {
  return (
    <div className="p-5 border border-themeSecondary200 rounded-2xl w-full ">
      <div className="p-4 bg-themeSecondary100 rounded-xl relative flex items-center justify-center">
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
          <Skeleton height={245} />
        )}
        {data?.discount ? (
          <Badge size="md" type="pill" className="absolute top-4 right-3 rounded-full">
            {data.discount.toFixed(0)}%
          </Badge>
        ) : (
          ""
        )}
      </div>
      {data?.name ? (
        <Link href={`/produit/${data?.slug}`}>
          <BodyText
            size="xl"
            className=" text-themeSecondary800 mt-5 hover:text-themePrimary600 transition hover:duration-300 line-clamp-2"
          >
            {data.name}
          </BodyText>
        </Link>
      ) : (
        <div className="mt-5">
          <Skeleton height={20} />
        </div>
      )}
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
      {data?.rating ? (
        <div className="flex items-center gap-2 mt-3">
          <div className="flex items-center gap-0.5">
            {/* @ts-ignore */}
            <Rating
              readonly
              initialRating={data?.rating}
              emptySymbol={<HiStar className="text-themeSecondary300 h-4 w-4" />}
              fullSymbol={<HiStar className="text-themeWarning500 h-4 w-4" />}
            />
          </div>
          <BodyText size="sm" className="text-themeSecondary400 mb-0.5">
            ({data?.reviews})
          </BodyText>
        </div>
      ) : (
        <Skeleton height={12} width={140} />
      )}
    </div>
  );
};
