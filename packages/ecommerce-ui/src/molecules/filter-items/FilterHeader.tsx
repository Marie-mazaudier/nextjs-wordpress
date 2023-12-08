import React from "react";
import { BodyText } from "../../atoms/typography/bodyText/BodyText";
import Skeleton from "react-loading-skeleton";

interface FilterHeaderProps {
  name?: string;
  isOpen?: any;
  setIsOpen?: any;
}

export const FilterHeader = ({ name, setIsOpen, isOpen }: FilterHeaderProps) => {
  return (
    <div onClick={() => setIsOpen(!isOpen)} className="bg-themeSecondary100 w-full py-6 rounded-t-xl px-6">
      {name ? (
        <div className="flex items-center justify-between cursor-pointer">
          <BodyText size="lg" intent="medium" className="uppercase text-themeSecondary800">
            {name}
          </BodyText>
          <svg width="14" height="2" viewBox="0 0 14 2" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0H14V2H0V0Z" fill="#71717A" />
          </svg>
        </div>
      ) : (
        <Skeleton height={20} />
      )}
    </div>
  );
};
