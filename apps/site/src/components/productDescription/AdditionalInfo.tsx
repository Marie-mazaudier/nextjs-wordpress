import { BodyText } from "@jstemplate/ecommerce-ui";
import React from "react";

export interface AdditionalInfoProps {
  productInfo?: any;
}

export const AdditionalInfo = ({ productInfo }: AdditionalInfoProps) => {
  return (
    <section className="p-5 md:p-12 bg-white">
      {productInfo?.map((singleData: any, index: number) => (
        <div
          className={`py-4 pl-5 lg:pl-7  flex flex-col gap-1 md:flex-row ${
            index % 2 === 0 ? "bg-themeSecondary100" : " bg-white"
          }`}
          key={index}
        >
          <BodyText size="md" className=" text-themeSecondary800 w-full md:w-1/2">
            {singleData.name}
          </BodyText>
          <div key={index} className=" w-full">
            <BodyText size="md" className=" text-themeSecondary500 w-full md:w-1/2">
              {singleData.options[0] ? singleData.options[0] : ""}
              &nbsp;&nbsp;
              {singleData.options[1] ? singleData.options[1] : ""}
              &nbsp;&nbsp;
              {singleData.options[2] ? singleData.options[2] : ""}
            </BodyText>
          </div>
        </div>
      ))}
    </section>
  );
};
