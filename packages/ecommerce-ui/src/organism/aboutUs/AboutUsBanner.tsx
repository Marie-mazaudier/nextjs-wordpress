import React from "react";
import { Placeholder } from "../../atoms/placeholder/Placeholder";
import { BodyText } from "../../atoms/typography/bodyText/BodyText";
import { Heading1 } from "../../atoms/typography/headingText/heading1";

interface AboutUsBannerProps {
  src?: string;
}
export const AboutUsBanner = ({ src = "/about.png"}: AboutUsBannerProps) => {
  return (
    <section className=" container mx-auto">
      <div className="hidden sm:block mt-8 md:mt-10 lg:mt-14 px-4 sm:px-0">
        <Placeholder src={src} imageWidth={1350} imageHeight={500} />
      </div>
      <div className="sm:hidden flex justify-center mt-8 md:mt-10 lg:mt-14 px-4 sm:px-0">
        <Placeholder src={src} imageWidth={500} imageHeight={380} />
      </div>
      <div className="flex items-center justify-center mt-8 md:mt-10 lg:mt-14">      
        <div className=" md:w-9/12 lg:w-6/12 xl:w-5/12">
          <Heading1 intent="semibold" className=" titre text-center">
            Empowering
          </Heading1>
          <Heading1 intent="semibold" className=" text-themeSecondary800 text-center">
            eCommerce brands everywhere.
          </Heading1>
          <BodyText size="lg" className=" text-themeSecondary600 mt-5 text-center">
            Learn more about our story and the hard-working people behind the pink envelope.
          </BodyText>
        </div>
      </div>
      <div className="hidden sm:block mt-8 md:mt-10 lg:mt-14 px-4 sm:px-0">
        <Placeholder src={src} imageWidth={1350} imageHeight={500} />
      </div>
      <div className="sm:hidden flex justify-center mt-8 md:mt-10 lg:mt-14 px-4 sm:px-0">
        <Placeholder src={src} imageWidth={500} imageHeight={380} />
      </div>
    </section>
  );
};
