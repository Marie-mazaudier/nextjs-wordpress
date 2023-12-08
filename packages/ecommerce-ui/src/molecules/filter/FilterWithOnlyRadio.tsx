import React from "react";
import { FilterHeader } from "../filter-items/FilterHeader";
import Skeleton from "react-loading-skeleton";

interface FilterWithOnlyRadioProps {
  name?: string;
  filterItems?: { name: string; value?: string | number }[];
  seValue?: any;
}

export const FilterWithOnlyRadio = ({ name, filterItems, seValue }: FilterWithOnlyRadioProps) => {
  const [isOpen, setIsOpen] = React.useState(true);
  const [itemValue, setItemValue] = React.useState("");

  const handleOnchange = (e: any) => {
    const value = e?.target?.value;
    if (value) {
      seValue(value);
      setItemValue(value);
    }
  };

  return (
    <div className="border border-themeSecondary200 rounded-t-xl h-auto">
      <FilterHeader isOpen={isOpen} setIsOpen={setIsOpen} name={name} />
      {isOpen && (
        <div className="grid grid-cols-5 lg:flex flex-wrap items-center w-full p-4 gap-x-1.5">
          {filterItems && filterItems.length > 0
            ? filterItems.map((item, index) => (
                <label key={index} htmlFor={item?.name} className="cursor-pointer h-fit p-1">
                  <div
                    className={`p-4 rounded-full border ${
                      itemValue == item?.value ? "border-themePrimary600" : " border-themeSecondary200"
                    }  relative`}
                  >
                    <input
                      id={item?.name}
                      name="color-group"
                      color={item?.name}
                      type="radio"
                      value={item?.value}
                      style={{ backgroundColor: item?.name }}
                      className={`cursor-pointer appearance-none	inline-block  w-6 h-6 rounded-full absolute right-1 top-1`}
                      onChange={handleOnchange}
                    />
                  </div>
                </label>
              ))
            : [1, 2, 3, 4, 5,6].map((index: number) => (
                <div key={index} className="flex flex-wrap justify-center gap-2 items-center">
                  <Skeleton className="rounded" circle={true} height={30} width={30} />
                </div>
              ))}
        </div>
      )}
    </div>
  );
};
