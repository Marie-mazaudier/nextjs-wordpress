import React from "react";
import { FilterHeader } from "../filter-items/FilterHeader";
import Skeleton from "react-loading-skeleton";
import { Ratings } from "../../atoms/ratings/Ratings";


interface FilterWithRatingProps {
  name?: string;
  filterItems?: { name?: string; value?: number }[];
}

export const FilterWithRating = ({ name, filterItems }: FilterWithRatingProps) => {
  
  const [isOpen, setIsOpen] = React.useState(true);
  
  return (
    <div className="border border-themeSecondary200 rounded-t-xl">
      <FilterHeader isOpen={isOpen} setIsOpen={setIsOpen} name={name} />
      {isOpen && (
        <div className="w-full h-full p-6 space-y-5">
          {filterItems && filterItems.length > 0
            ? filterItems.map((item, index) => (
                <label key={index} htmlFor={item?.name} className="flex items-center gap-4 cursor-pointer group w-fit">
                  <input
                    id={item?.name}
                    name="rating-group"
                    type="radio"
                    value={item?.name}
                    className="cursor-pointer appearance-none	inline-block	relative bg-white text-themePrimary600 top-0 letf-0 border-2 border-themeSecondary300 rounded-full w-5 h-5 radio_style_one"
                  />
                  {item?.value !== undefined && (
                    <div className="flex items-center gap-1">
                      {[...Array(item?.value)].map((_, i) => (
                        <Ratings key={i} color="yellow" size="lg" />
                      ))}
                      {[...Array(5 - item?.value)].map((_, i) => (
                        <Ratings key={i} color="gray" size="lg" />
                      ))}
                    </div>
                  )}
                </label>
              ))
            : [1, 2, 3, 4, 5].map((index: number) => <Skeleton key={index} height={20} />)}
        </div>
      )}
    </div>
  );
};
