import React from "react";
import { Placeholder } from "../../atoms/placeholder/Placeholder";
import { BodyText } from "../../atoms/typography/bodyText/BodyText";
import { Heading2 } from "../../atoms/typography/headingText/Heading2";
import { Heading3 } from "../../atoms/typography/headingText/heading3";

interface OurOfferProps {
  src?: string;
  imageWidth?: number;
  imageHeight?: number;
}

export const OurOffer = ({ src = "/image/platform1.png", imageWidth = 660, imageHeight = 520 }: OurOfferProps) => {
  return (
    <section className=" container mx-auto flex flex-col md:flex-row gap-10 md:gap-14 px-5 md:px-0">
      <div className="w-full  md:w-1/2">
        <Placeholder src={src} imageWidth={imageWidth} imageHeight={imageHeight} />
      </div>
      <div className="w-full md:w-5/12">
        <Heading2 intent="bold" className=" text-themeSecondary900">
          What can we do for you?
        </Heading2>
        <div className="mt-7 border-b-2 border-themeSecondary200 pb-8">
          <Heading3 intent="medium" className=" text-themeSecondary800">
            Best Quality
          </Heading3>
          <BodyText size="md" className=" text-themeSecondary600 mt-3">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text
          </BodyText>
        </div>
        <div className="mt-7 border-b-2 border-themeSecondary200 pb-8">
          <Heading3 intent="medium" className=" text-themeSecondary800">
            Best Quality
          </Heading3>
          <BodyText size="md" className=" text-themeSecondary600 mt-3">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text
          </BodyText>
        </div>
        <div className="mt-7">
          <Heading3 intent="medium" className=" text-themeSecondary800">
            Best Quality
          </Heading3>
          <BodyText size="md" className=" text-themeSecondary600 mt-3">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text
          </BodyText>
        </div>
      </div>
    </section>
  );
};
