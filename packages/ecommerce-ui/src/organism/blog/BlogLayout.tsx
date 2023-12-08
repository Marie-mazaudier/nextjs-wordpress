import React, { useState } from "react";
import { BlogCard } from "../../molecules/blog/BlogCard";
import { Tags } from "../../molecules/blog-sidebar/Tags";
import { Search } from "../../molecules/blog-sidebar/Search";
import { RecentPosts } from "../../molecules/blog-sidebar/RecentPosts";
import { BlogFilter } from "../../molecules/blog-sidebar/BlogFilter";
import { Spaces } from "../../atoms/space/Spaces";
import { BodyText } from "../../atoms/typography/bodyText/BodyText";
import { RxCross2 } from "react-icons/rx";
import { ArchiveFilter } from "../../molecules/blog-sidebar/ArchiveFilter";
import { Button } from "../../atoms/button/Button";

interface BlogLayoutProps {
  data?: any;
  categoryData?: any;
  tagData?: any;
  handleClick?: any;
  pageData?: any;
}

export const BlogLayout = ({ data, categoryData, tagData, handleClick, pageData }: BlogLayoutProps) => {
  const cardData = data?.length > 0 ? data : [1, 2, 3, 4, 5, 6];
  const [open, SetOpen] = React.useState(false);
  return (
    <>
      <div
        onClick={() => SetOpen(!open)}
        className="flex items-center justify-between px-5 py-4 border rounded-lg mb-10 cursor-pointer lg:hidden"
      >
        <BodyText size="md" intent="medium" className="capitalize">
          More Option
        </BodyText>
        <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 14V16H3V14H15ZM18 7V9H0V7H18ZM15 0V2H3V0H15Z" fill="#64748B" />
        </svg>
      </div>
      <div className="grid grid-cols-12 gap-7">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 col-span-12 lg:col-span-8">
          {cardData.map((item: any, index: number) => (
            <BlogCard key={index} data={item} />
          ))}
          {cardData?.length > 5 && cardData.length === pageData && (
            <>
              <div className="flex items-center justify-center lg:justify-end mt-10 lg:mt-14">
                <div onClick={handleClick}>
                  <Button color="dark">Load More</Button>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="hidden lg:block col-span-12 lg:col-span-4">
          <Search />
          <Spaces size="xss" />
          <BlogFilter title="Browse By Categories" data={categoryData} />
          <Spaces size="xss" />
          {/* <ArchiveFilter title="Archives" data={filterDataTwo} /> */}
          <Spaces size="xss" />
          <RecentPosts imageWidth={100} imageHeight={100} data={data} />
          <Spaces size="xss" />
          <Tags title="tags" data={tagData} />
        </div>
      </div>
      {/* small device blog sidebar */}
      <div>
        <div className="block lg:hidden relative">
          <div
            className={`overflow-y-auto z-40 flex pt-5 top-0 flex-col  h-screen w-full max-w-xs sm:max-w-md fixed bg-white duration-300 ease-in-out gap-2 md:gap-0 ${open ? "left-0" : "-left-full"
              }`}
          >
            <div className="relative flex flex-col gap-5">
              <div className="flex items-center justify-between px-6">
                <BodyText size="lg" intent="semibold">
                  More Option
                </BodyText>
                <RxCross2
                  className=" text-themeSecondary400 font-bold text-xl cursor-pointer transition hover:text-themePrimary600  hover:duration-700"
                  onClick={() => SetOpen(!open)}
                />
              </div>
            </div>
            <div className="mt-7 px-6 flex flex-col gap-5">
              <Search />
              <Spaces size="xss" />
              <BlogFilter title="Browse By Categories" data={categoryData} />
              <Spaces size="xss" />
              {/* <ArchiveFilter title="Archives" data={filterDataTwo} /> */}
              <Spaces size="xss" />
              <RecentPosts imageWidth={100} imageHeight={100} data={data} />
              <Spaces size="xss" />
              <Tags title="tags" data={tagData} />
            </div>
          </div>
        </div>
        {/* background overlay */}
        <div
          className={`lg:hidden fixed top-0 z-30 transition-all duration-500 ease-in-out  bg-[#868687] opacity-80 h-full w-full ${open ? "left-0" : "-left-full"
            }`}
          onClick={() => SetOpen(false)}
        />
      </div>
    </>
  );
};

const filterDataTwo = [
  {
    name: "December 2022",
    link: "December-2022",
  },
  {
    name: "January 2023",
    link: "January-2023",
  },
];
