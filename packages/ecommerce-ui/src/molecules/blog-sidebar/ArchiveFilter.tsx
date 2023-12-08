import React from "react";
import { BodyText } from "../../atoms/typography/bodyText/BodyText";
import Link from "next/link";

interface ArchiveFilterProps {
  data?: any;
  title?: string;
}

export const ArchiveFilter = ({ data, title = "Archives" }: ArchiveFilterProps) => {
  const cardData = data?.length > 0 ? data : [1, 2, 3, 4, 5];
  return (
    <div className="border rounded-2xl p-7">
      <BodyText size="xl" intent="medium" className="text-thmeBlackLight mb-6 capitalize">
        {title}
      </BodyText>
      {cardData?.map((item: any, index: number) => (
        <Link key={index} href={`${item.link}`}>
          <div className="flex items-center justify-between border-b py-4 ">
            <BodyText
              size="md"
              className="text-themeGray capitalize hover:text-themePrimary600 transition hover:duration-700"
            >
              {item?.name} {item?.count && `(${item?.count})`}
            </BodyText>
            <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1.5 11L6.5 6L1.5 1"
                stroke="#6B7280"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </Link>
      ))}
    </div>
  );
};
