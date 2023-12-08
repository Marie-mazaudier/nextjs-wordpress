import React from "react";
import Skeleton from "react-loading-skeleton";
import { ContactCard } from "../../molecules/cards/ContactCard";

interface ContactInfoProps {
  data?: any;
}
export const ContactInfo = ({ data }: ContactInfoProps) => {
  return (
    <section className="container mx-auto flex flex-col md:flex-row gap-6 lg:gap-7 px-5 md:px-0 w-full">
      {data?.map((singleData: any, index: number) => (
        <div className="w-full" key={index}>
          <ContactCard data={singleData} />
        </div>
      ))}
      {!data &&
        [1, 2, 3].map((singleData: any, index: number) => (
          <div key={index} className="w-full">
            <div className="p-6 lg:p-7 xl:p-10 border border-themeSecondary200 rounded-xl">
              <Skeleton height={30} width={120} />
              <div className=" mt-4">
                <Skeleton height={20} width={220} />
                <Skeleton height={20} width={220} />
              </div>
            </div>
          </div>
        ))}
    </section>
  );
};
