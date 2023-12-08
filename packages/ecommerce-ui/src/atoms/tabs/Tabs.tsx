import React, { useState } from "react";
import { BodyText } from "../typography/bodyText/BodyText";

interface TabsProps {
  data?: any;
  active?: any;
  setActive?: any;
}

export const Tabs = ({ data, active, setActive }: TabsProps) => {
  return (
    <section className="bg-themeSecondary100 px-5 flex flex-col w-full justify-center">
      <div className="w-full mx-auto md:w-fit">
        <div className="flex items-center gap-6 md:gap-10 overflow-x-auto w-full">
          {data?.map((singleData: any, index: number) => (
            <div className="w-full" key={index} onClick={() => setActive(index)}>
              <BodyText
                size="lg"
                className={`${active === index
                  ? "text-secondaire border-b-[3px] border-secondaire "
                  : "text-principal border-b-[3px] border-transparent"
                  } py-5 cursor-pointer whitespace-nowrap`}
              >
                {singleData.title}
              </BodyText>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
