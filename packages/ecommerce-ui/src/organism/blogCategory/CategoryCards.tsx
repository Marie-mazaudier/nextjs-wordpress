import React from "react";
import { Button } from "../../atoms/button/Button";
import { BlogCard } from "../../molecules/blog/BlogCard";

interface CategoryCardsProps {
  data?: any;
  pageData?: any;
  handleClick?: any;
}

export const CategoryCards = ({ data, handleClick, pageData }: CategoryCardsProps) => {
  const cardData = data?.length > 0 ? data : [1, 2, 3, 4, 5, 6];
  return (
    <section className="container mx-auto mb-14 lg:mb-24 px-5 md:px-0">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 col-span-12 lg:col-span-8 h-fit">
        {cardData.map((singleData: any, index: number) => (
          <BlogCard key={index} data={singleData} />
        ))}
      </div>
      {cardData?.length > 5 && cardData.length === pageData && (
        <>
          <div className="flex items-center justify-center mt-10 lg:mt-14">
            <div onClick={handleClick}>
              <Button color="light">Load More</Button>
            </div>
          </div>
        </>
      )}
    </section>
  );
};
