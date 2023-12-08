import Link from "next/link";
import React from "react";
import Skeleton from "react-loading-skeleton";
import { Button } from "../../../atoms/button/Button";
import { Placeholder } from "../../../atoms/placeholder/Placeholder";
import { BodyText } from "../../../atoms/typography/bodyText/BodyText";
import { Heading3 } from "../../../atoms/typography/headingText/heading3";

interface OfferBannerProps {
  data?: any;
}
export const OfferBanner = ({ data }: OfferBannerProps) => {
  return (
    <>
      <div className=" bg-themeSecondary100 p-7 rounded-2xl w-full flex items-center justify-center gap-5 lg:gap-16">
        <div>
          {data?.category ? (
            <BodyText size="sm" className="  text-themeSecondary600">
              {data.category}
            </BodyText>
          ) : (
            <Skeleton width={50} height={20} />
          )}
          {data?.title ? (
            <Heading3 intent="bold" className=" text-themeSecondary800 whitespace-nowrap">
              {data.title}
            </Heading3>
          ) : (
            <Skeleton width={140} height={30} />
          )}
          {data?.price ? (
            <div className="mt-2.5 flex items-center gap-1">
              <BodyText size="sm" className=" text-themeSecondary600">
                Starting at
              </BodyText>
              <BodyText size="lg" intent="bold" className=" text-themePrimary600">
                ${data.price}
              </BodyText>
            </div>
          ) : (
            <Skeleton width={50} height={20} />
          )}
          <Link href='/shop'>
            <Button size="md" color="white" type="pill" className=" mt-14  whitespace-nowrap">
              SHOP NOW
            </Button>
          </Link>
        </div>
        <div>
          {data?.image ? (
            <Placeholder src={data.image} imageWidth={160} imageHeight={160} />
          ) : (
            <Skeleton width={160} height={160} />
          )}
        </div>
      </div>
    </>
  );
};
