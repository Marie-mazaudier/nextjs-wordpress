import React from "react";
import { IconBoxCardOne } from "../../molecules/icon-box-card/IconBoxCardOne";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

interface IconBoxOneProps {
  data?: any;
}
export const IconBoxOne = ({ data }: IconBoxOneProps) => {
  return (
    <div className="container mx-auto">
      <div className="px-5 sm:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 lg:gap-8">
          {/* main card display */}
          {data && data?.map((item: any, index: number) => <IconBoxCardOne key={index} cardItemData={item} />)}

          {/* loading skeleton */}
          {!data &&
            [1, 2, 3, 4]?.map((item: any, index: number) => (
              <div key={index} className="relative rounded-2xl overflow-hidden">
                <Skeleton height={210} />
                <div className="absolute inset-x-0 bottom-[115px] rounded z-20 flex justify-center">
                  <SkeletonTheme baseColor="#2020201f" highlightColor="#f5f5f5">
                    <Skeleton height={60} width={60} />
                  </SkeletonTheme>
                </div>
                <div className="absolute inset-x-0 bottom-[72px] rounded z-20 px-16">
                  <SkeletonTheme baseColor="#2020201f" highlightColor="#f5f5f5">
                    <Skeleton height={25} />
                  </SkeletonTheme>
                </div>
                <div className="absolute inset-x-0 bottom-11 rounded z-20 px-10">
                  <SkeletonTheme baseColor="#2020201f" highlightColor="#f5f5f5">
                    <Skeleton height={20} />
                  </SkeletonTheme>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
