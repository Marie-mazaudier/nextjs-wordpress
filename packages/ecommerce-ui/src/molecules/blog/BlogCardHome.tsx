import React, { useEffect, useState } from "react";
import { Placeholder } from "../../atoms/placeholder/Placeholder";
import { BodyText } from "../../atoms/typography/bodyText/BodyText";
import { Heading3 } from "../../atoms/typography/headingText/heading3";
import Skeleton from "react-loading-skeleton";
import Link from "next/link";
import * as DOMPurify from 'dompurify';

export type BlogCardHomeProps = {
    data?: {
        id?: number;
        title?: string;
        slug?: string;
        content?: any;
        excerpt?: any;
        featuredmedia?: {
            mediaItemUrl?: string;
            alt?: string;
        };
        author?: string;
        authorId?: number;
        authorSlug?: string;
        category?: { name: string; slug: string; }[];
        publishTime?: string;
    };
};
export const BlogCardHome = ({ data }: BlogCardHomeProps) => {
    //console.log('data', data)
    const formatDateFR = (dateISO: any) => {
        const date = new Date(dateISO);
        // Formatage de la date en jour/mois/année. Ajoutez 1 au mois car Janvier = 0
        return new Intl.DateTimeFormat('fr-FR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        }).format(date);
    };
    const publishDateFR = formatDateFR(data?.publishTime);
    const contentWithStyle = data?.excerpt?.replace(/<p>/g, "<p/>");
    const contentWithoutHtml = contentWithStyle?.replace(/(<([^>]+)>)/gi, "");
    const contentWithoutHtmlAndLimit = contentWithoutHtml?.slice(0, 375);
    const [htmlContent, setHtmlContent] = useState('');
    useEffect(() => {
        // Mettre à jour le contenu HTML ici si nécessaire
        setHtmlContent(DOMPurify.sanitize(contentWithoutHtmlAndLimit))

    }, [contentWithoutHtmlAndLimit]);
    return (
        <div className="p-6 h-full">
            <div className="flex items-center justify-center">
                <div className="relative w-full">
                    {data?.featuredmedia?.mediaItemUrl ? (
                        <Placeholder
                            className=""
                            src={data.featuredmedia.mediaItemUrl}
                            alt={data.featuredmedia.alt}
                            imageWidth={382}
                            imageHeight={286}
                        />
                    ) : (
                        <Skeleton height={286} />
                    )}
                    <div className="flex gap-4 items-center	">
                        <BodyText intent="thin">{publishDateFR}</BodyText>
                        {data?.category &&

                            data?.category?.map((singleData: any, index: number) => (
                                <Link href={`/blog-category/${singleData?.slug}`} key={index}>
                                    <BodyText
                                        size="sm"
                                        intent="medium"
                                        className="texte_class  px-2 py-1 w-fit  "
                                    >
                                        {singleData?.name}
                                    </BodyText>
                                </Link>
                            ))}
                    </div>
                </div>
            </div>
            {data?.title ? (
                <Link href={`/blog/${data?.slug}`}>
                    <Heading3
                        intent="medium"
                        className="main_font small transition hover:duration-700"
                    >
                        {data.title}
                    </Heading3>
                </Link>
            ) : (
                <Skeleton height={30} />
            )}

            {data?.excerpt ? (
                <BodyText size="md" className="text-themeGray mt-2.5 line-clamp-2">
                    <span
                        dangerouslySetInnerHTML={{
                            __html: htmlContent,
                        }}
                    ></span>
                </BodyText>
            ) : (
                <Skeleton height={40} />
            )}
            <div className="flex">
            </div>
        </div>
    );
};
