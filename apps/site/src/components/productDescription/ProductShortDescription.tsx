import { Badge, BodyText, Heading2 } from "@jstemplate/ecommerce-ui";
import React from "react";
import { FaStar } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";

interface ProductShortDescriptionProps {
  data?: any;
}
const ProductShortDescription = ({ data }: ProductShortDescriptionProps) => {
  const repliceContent = data?.short_description?.replace(/<p>/g, "").replace(/<\/p>/g, "");
  return (
    <div>
      {data?.name ? (
        <Heading2 intent="bold" className="text-themeSecondary800">
          {data?.name}
        </Heading2>
      ) : (
        <>
          <Skeleton height={36} />
          <Skeleton height={36} />
        </>
      )}
      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mt-4">
        {data ? (
          <div className="flex items-center gap-2">
            {data?.sale_price ? (
              <BodyText size="xl" intent="bold" className=" text-themePrimary600">
                ${data?.sale_price}
              </BodyText>
            ) : (
              <Skeleton width={35} height={28} />
            )}

            {data?.regular_price ? (
              <BodyText size="md" className="text-themeSecondary400 line-through">
                ${data?.regular_price}
              </BodyText>
            ) : (
              <Skeleton width={50} height={28} />
            )}
          </div>
        ) : (
          <Skeleton height={28} width={85} />
        )}
        <div className="bg-themeSecondary200 h-8  w-0.5 hidden md:block"> </div>
        <div className=" flex items-center gap-3">
          {data ? (
            <div>
              {data?.rating && (
                <div className="flex gap-1">
                  <FaStar className="text-base text-themeWarning500" />
                  <BodyText size="sm" className=" text-themeSecondary800">
                    {data?.rating}
                  </BodyText>
                </div>
              )}
            </div>
          ) : (
            <Skeleton height={20} width={50} />
          )}
          {data ? (
            <BodyText size="sm" className="text-themeSecondary800">
              • {data?.reviews} reviews
            </BodyText>
          ) : (
            <Skeleton height={20} width={75} />
          )}
          {data ? (
            <Badge size="sm" type="pill" className="rounded-full w-fit">
              {data?.stock}
            </Badge>
          ) : (
            <Skeleton height={24} width={80} borderRadius={50} />
          )}
        </div>
      </div>
      <div className="border border-themeSecondary200 w-full mt-5"></div>
      {data ? (
        <BodyText size="md" className="text-themeSecondary500 mt-5 line-clamp-3">
          {repliceContent}
        </BodyText>
      ) : (
        <>
          <Skeleton height={24} />
          <Skeleton height={24} />
          <Skeleton height={24} />
        </>
      )}

      <div className="border border-themeSecondary200 w-full mt-5"></div>
    </div>
  );
};

export default ProductShortDescription;
