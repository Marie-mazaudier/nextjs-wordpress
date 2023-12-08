import React from "react";
import Link from "next/link";

export interface SocialLinkProps {
  data: any;
}

export const SocialLink = ({ data }: SocialLinkProps) => {
  return (
    <div className="flex gap-2">
      {data.map((singleData: any, index: number) => (
        <Link href={singleData?.link} key={index}>
          <div className="p-3 w-fit bg-themeSecondary700 rounded-full group">
            <p className=" text-white group-hover:text-themePrimary600 transition hover:duration-700 text-base">
              {singleData?.icon}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};
