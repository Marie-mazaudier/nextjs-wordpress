import React from "react";
import Skeleton from "react-loading-skeleton";

interface FilterDropDownProps {
  options?: { id?: number; name?: string; value?: number | string }[];
  setpage?: any;
}
export const FilterDropDown = ({ options, setpage }: FilterDropDownProps) => {
  const onSearchChange = (e: any) => {
    const { value } = e.target;
    setpage(value);
  };

  return (
    <>
      {options && options.length > 0 ? (
        <select
          className="pl-4 pr-10 py-2.5 border appearance-none border-themeSecondary300 focus:outline-none text-themeSecondary600 svg_icon cursor-pointer capitalize"
          onChange={onSearchChange}
        >
          {options?.map((option, index) => (
            <option key={index} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
      ) : (
        <Skeleton height={40} width={100} />
      )}
    </>
  );
};
