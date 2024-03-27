import React from "react";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";


interface CategoriesTabsDataProps {
    category?: any;

}

export const CategoriesTabsData = ({ category }: CategoriesTabsDataProps) => {
    return (
        <div className="p-4 bg-themeSecondary100 rounded-xl relative flex items-center justify-center">
            {category?.name ? (
                <Link href={`/produit/${category?.slug}`}>
                    <p className=" text-themeSecondary800 mt-5 hover:text-themePrimary600 transition hover:duration-700 line-clamp-2"
                    >
                        {category.name}
                    </p>
                </Link>
            ) : (
                <div className="mt-5">
                    <Skeleton height={20} />
                </div>
            )}
        </div>
    );
};  