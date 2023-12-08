import React from "react";
import { Placeholder } from "../../atoms/placeholder/Placeholder";
import { BodyText } from "../../atoms/typography/bodyText/BodyText";
import { Heading3 } from "../../atoms/typography/headingText/heading3";
import Skeleton from "react-loading-skeleton";
import Link from "next/link";

export type ClientCardProps = {
    data?: {
        id?: number;
        title?: string;
        slug?: string;
        content?: any;
        featuredmedia?: {
            sourceUrl?: string;
            alt?: string;
        };
        author?: string;
        authorId?: number;
        authorSlug?: string;
        category?: Array<string>;
        publishTime?: string;
    };
};
export const ClientCard = ({ data }: ClientCardProps) => {

    return (
        <div className="p-6  rounded-2xl h-full">
            <div className="flex items-center justify-center">
                <div className="relative w-full">
                    {data && data.featuredmedia && data.featuredmedia.sourceUrl !== undefined ? (
                        <Placeholder
                            className="rounded-xl"
                            src={data.featuredmedia.sourceUrl}
                            alt={data.featuredmedia.alt}
                            imageWidth={382}
                            imageHeight={286}
                        />
                    ) : (
                        <div className="space-y-2.5">
                            <Skeleton width={40} height={20} />
                        </div>
                    )}


                </div>
            </div>

        </div>
    );
};
