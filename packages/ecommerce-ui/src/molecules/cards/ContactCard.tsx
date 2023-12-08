import React from "react";
import Skeleton from "react-loading-skeleton";
import { BodyText } from "../../atoms/typography/bodyText/BodyText";
import { Heading3 } from "../../atoms/typography/headingText/heading3";

interface ContactCardProps {
  data?: any;
}
export const ContactCard = ({ data }: ContactCardProps) => {
  return (
    <div>
      <div className="p-6 lg:p-7 xl:p-10 border border-themeSecondary200 rounded-xl">
        <Heading3 intent="medium" className="text-themeSecondary800">
          {data.title}
        </Heading3>
        <BodyText size="xl" className=" text-themeSecondary500 mt-4">
          {data.contact1}
        </BodyText>
        <BodyText size="xl" className=" text-themeSecondary500">
          {data.contact2}
        </BodyText>
      </div>
    </div>
  );
};
