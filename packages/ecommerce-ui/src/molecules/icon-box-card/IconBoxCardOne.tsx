import React from "react";
import { BodyText } from "../../atoms/typography/bodyText/BodyText";

interface IconBoxCardOneProps {
  cardItemData?: any;
}

export const IconBoxCardOne = ({ cardItemData }: IconBoxCardOneProps) => {
  return (
    <div className="flex flex-col justify-center items-center border border-themeSecondary200 rounded-2xl py-8 lg:py-10 hover:shadow-dropShadowXl transition hover:duration-700 group">
      <div className="fill-themePrimary600">{cardItemData?.icon}</div>
      <div className="text-center">
        {/* <h6 className="text-lg font-medium text-themeSecondary800 mt-4 mb-1">{item?.title}</h6> */}
        <BodyText size="lg" intent="medium" className="text-themeSecondary800 group-hover:text-themePrimary600 transition group-hover:duration-700  mt-4 mb-1">
          {cardItemData?.title}
        </BodyText>
        {/* <p className="text-sm font-normal text-themeSecondary500">{item?.description}</p> */}
        <BodyText size="sm" intent="regular" className="text-themeSecondary500">
          {cardItemData?.description}
        </BodyText>
      </div>
    </div>
  );
};
