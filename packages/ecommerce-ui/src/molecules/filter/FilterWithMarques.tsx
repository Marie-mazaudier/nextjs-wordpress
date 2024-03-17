import Link from "next/link";
import React from "react";
import Skeleton from "react-loading-skeleton";
import { BodyText } from "../../atoms/typography/bodyText/BodyText";
import { FilterHeader } from "../filter-items/FilterHeader";

interface FilterWithMarquesProps {
    name?: string;
    filterItems?: { name: string; id?: string; slug?: string; }[];

}

export const FilterWithMarques = ({ filterItems, name }: FilterWithMarquesProps) => {
    const [isOpen, setIsOpen] = React.useState(true);
    // {`/category?id=${singleData.id}}
    return (
        <div className="border border-themeSecondary200 rounded-t-xl">
            <FilterHeader isOpen={isOpen} setIsOpen={setIsOpen} name={name} />
            {isOpen && (
                <div className="p-6 w-full h-full">
                    {filterItems && filterItems.length > 0
                        ? filterItems.map((item, index) => (
                            <Link key={index} href={`/marques/${item.slug}`}>
                                <div className="flex items-center justify-between group cursor-pointer">
                                    <BodyText
                                        className="text-themeSecondary600 capitalize py-1.5 group-hover:text-themePrimary600 transition duration-300 ease-in-out"
                                        size="md"
                                    >
                                        {item?.name}
                                    </BodyText>
                                    <svg
                                        className="text-themeSecondary400 group-hover:text-themePrimary600 transition duration-300 ease-in-out"
                                        width="8"
                                        height="12"
                                        viewBox="0 0 8 12"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M4.97656 5.99999L0.851562 1.87499L2.0299 0.696655L7.33323 5.99999L2.0299 11.3033L0.851562 10.125L4.97656 5.99999Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                </div>
                            </Link>
                        ))
                        : [1, 2, 3, 4, 5].map((index: number) => <Skeleton key={index} height={20} />)}
                </div>
            )}
        </div>
    );
};
