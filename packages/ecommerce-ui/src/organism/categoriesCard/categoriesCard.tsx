import React from "react";
import { Placeholder } from "../../atoms/placeholder/Placeholder";
import { BodyText } from "../../atoms/typography/bodyText/BodyText";
import { Badge } from "../../atoms/badges/Badge";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import { HiStar } from "react-icons/hi2";
import Rating from "react-rating";

interface CategoriesCardProps {
    category?: any;

}

export const CategoriesCard = ({ category }: CategoriesCardProps) => {
    return (
        <div className="p-5 border border-themeSecondary200 rounded-2xl w-full">
            <div className="p-4 bg-themeSecondary100 rounded-xl relative flex items-center justify-center">
                {category?.image ? (
                    category?.image
                        ?.slice(0, 1)
                        .map((image: any, index: number) => (
                            <Placeholder
                                className="w-full"
                                key={index}
                                src={image?.src}
                                imageWidth={245}
                                imageHeight={245}
                                alt={image?.alt}
                            />
                        ))
                ) : (
                    <Skeleton height={245} />
                )}

            </div>
            {category?.name ? (
                <Link href={`/shop/product/${category?.slug}`}>
                    <BodyText
                        size="xl"
                        className=" text-themeSecondary800 mt-5 hover:text-themePrimary600 transition hover:duration-700 line-clamp-2"
                    >
                        {category.name}
                    </BodyText>
                </Link>
            ) : (
                <div className="mt-5">
                    <Skeleton height={20} />
                </div>
            )}

        </div>
    );
};
