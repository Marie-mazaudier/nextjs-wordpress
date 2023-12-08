import React from "react";
import Skeleton from "react-loading-skeleton";
import { BodyText } from "../../atoms/typography/bodyText/BodyText";
import { FilterHeader } from "../filter-items/FilterHeader";



interface FilterWithRadioProps {
  name?: string;
  filterItems?: { name: string }[];
}

export const FilterWithRadio = ({ name, filterItems }: FilterWithRadioProps) => {

  const [isOpen, setIsOpen] = React.useState(true);
  
  return (
    <div className="border border-themeSecondary200 rounded-t-xl">
      <FilterHeader isOpen={isOpen} setIsOpen={setIsOpen} name={name} />
      {isOpen && (
        <div className="w-full h-full p-6">
          {filterItems && filterItems.length > 0
            ? filterItems.map((item, index) => (
                <label key={index} htmlFor={item?.name} className="flex items-center gap-4 cursor-pointer group w-fit">
                  <input
                    id={item?.name}
                    name="brand-group"
                    type="radio"
                    value={item?.name}
                    className="cursor-pointer appearance-none	inline-block	relative bg-white text-themePrimary600 top-0 letf-0 border-2 border-themeSecondary300 rounded-full w-5 h-5 radio_style_one"
                  />
                  <BodyText
                    className="text-themeSecondary600 capitalize py-1.5 group-hover:text-themePrimary600 transition duration-300 ease-in-out"
                    size="md"
                  >
                    {item?.name}
                  </BodyText>
                </label>
              ))
            : [1, 2, 3, 4, 5].map((index: number) => <Skeleton key={index} height={20} />)}
        </div>
      )}
    </div>
  );
};
