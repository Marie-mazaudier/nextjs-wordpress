import React from "react";
import Skeleton from "react-loading-skeleton";

interface FilterDropDownProps {
  options?: { id?: number; name?: string; value?: string }[];
  setSortOption: (value: string) => void; // Modification ici pour clarifier l'utilisation
}

export const FilterDropDown = ({ options, setSortOption }: FilterDropDownProps) => {
  const onSearchChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setSortOption(value);
  };

  return (
    <>
      {options && options.length > 0 ? (
        <select
          className="pl-4 pr-10 py-2.5 border appearance-none border-themeSecondary300 focus:outline-none text-themeSecondary600 svg_icon cursor-pointer capitalize"
          onChange={onSearchChange}
        >
          <option value="">Choisir un tri</option> {/* Option par défaut pour annuler le tri */}
          {options.map((option, index) => (
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
