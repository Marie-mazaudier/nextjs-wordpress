import React, { useEffect, useState } from "react";
import { Placeholder } from "../../atoms/placeholder/Placeholder";
import { BodyText } from "../../atoms/typography/bodyText/BodyText";
import { Heading3 } from "../../atoms/typography/headingText/heading3";
import Skeleton from "react-loading-skeleton";
import Link from "next/link";
import * as DOMPurify from 'dompurify';

export type BlogCardProps = {
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
export const BlogCard = ({ data }: BlogCardProps) => {
  const contentWithStyle = data?.content?.replace(/<p>/g, "<p/>");
  const contentWithoutHtml = contentWithStyle?.replace(/(<([^>]+)>)/gi, "");
  const contentWithoutHtmlAndLimit = contentWithoutHtml?.slice(0, 375);
  const [htmlContent, setHtmlContent] = useState('');
  useEffect(() => {
    // Mettre à jour le contenu HTML ici si nécessaire
    setHtmlContent(DOMPurify.sanitize(contentWithoutHtmlAndLimit))

  }, [contentWithoutHtmlAndLimit]);
  return (
    <div className="p-6 border rounded-2xl h-full">
      <div className="flex items-center justify-center">
        <div className="relative w-full">
          {data?.featuredmedia?.sourceUrl ? (
            <Placeholder
              className="rounded-xl"
              src={data.featuredmedia.sourceUrl}
              alt={data.featuredmedia.alt}
              imageWidth={382}
              imageHeight={286}
            />
          ) : (
            <Skeleton height={286} />
          )}
          {data?.category &&
            ((typeof data?.category === "string" && (
              <BodyText
                size="sm"
                intent="medium"
                className="text-white rounded-lg bg-themeRgbaColorTwo border px-2 py-1 w-fit absolute bottom-6 left-6"
              >
                Technology
              </BodyText>
            )) ||
              (typeof data?.category != "string" &&
                data?.category?.slice(0, 1).map((singleData: any, index: number) => (
                  <Link href={`/blog-category/${singleData?.name}`} key={index}>
                    <BodyText
                      size="sm"
                      intent="medium"
                      className="text-white rounded-lg bg-themeRgbaColorTwo border px-2 py-1 w-fit absolute bottom-6 left-6"
                    >
                      {singleData?.name}
                    </BodyText>
                  </Link>
                ))))}
        </div>
      </div>
      {data?.title ? (
        <Link href={`/blog/${data?.slug}`}>
          <Heading3
            intent="medium"
            className="text-thmeBlackLight line-clamp-2 mt-4 hover:text-themePrimary600 transition hover:duration-700"
          >
            {data.title}
          </Heading3>
        </Link>
      ) : (
        <Skeleton height={30} />
      )}

      {data?.content ? (
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
      <BodyText className="text-themeGraylight mt-2">
        By:{" "}
        {data?.author ? (
          <Link href={`/author/${data?.authorId}`} className="text-themePrimary600">
            {data?.author}
          </Link>
        ) : (
          <Skeleton height={20} width={100} />
        )}
      </BodyText>
    </div>
  );
};
