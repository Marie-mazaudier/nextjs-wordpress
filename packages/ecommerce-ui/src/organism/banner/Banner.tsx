import Link from "next/link";
import React, { FC } from "react";
import { Button } from "../../atoms/button/Button";
import { Placeholder } from "../../atoms/placeholder/Placeholder";
import { DisplayText1 } from "../../atoms/typography/displayText/DisplayText1";
import { Heading1 } from "../../atoms/typography/headingText/heading1";
import { Heading3 } from "../../atoms/typography/headingText/heading3";

export interface BannerProps {
  src: string
  imageHeight: number
  imageWidth: number
  title?: string;
  data?: any;
  className?: string;
}

export const Banner: FC<BannerProps> = ({ imageWidth, src, imageHeight }) => {
  return (
    <section className="bg-themeSecondary100 relative">
      <div className="absolute inset-0 bg-black opacity-25 w-full h-full z-10"></div>

      <div className="container mx-auto flex items-center justify-between px-5 md:px-0 h-[430px] md:h-[430px] lg:h-[700px] relative">
        <div className=" w-1/2 z-10">
          <div className=" flex gap-2 md:gap-5">
            <Button size="xs" type="pill" className="text-sm mb-4">
              NEW
            </Button>
            <Heading3>
              <span className="hidden md:inline">Flat</span> <span className=" font-bold">20% Off</span>
            </Heading3>
          </div>
          <DisplayText1 intent="black" className=" text-themeSecondary900">
            PERFECT COLLECTION GADGETS
          </DisplayText1>
        </div>
        <div className="md:absolute md:top-0 left-44  md:left-80 lg:left-1/3 z-0">
          <Placeholder src={src} imageHeight={imageHeight} imageWidth={imageWidth} />
        </div>
        <div className=" w-[370px] hidden lg:block">
          <Heading1 intent="bold" className=" text-themeSecondary900">
            FREE HOME DELIVERY OUTSIDE FROM THE CITY
          </Heading1>
          <Link href='/shop'>
            <Button size="xl" type="pill" className="mt-7">
              SHOP NOW
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};