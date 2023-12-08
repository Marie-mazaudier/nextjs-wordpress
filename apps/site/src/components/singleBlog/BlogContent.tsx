import React from "react";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import parse from "html-react-parser";
import styled from "@emotion/styled";
import moment from "moment";
import Image from "next/image";
import { Badge, BodyText, Heading1, Placeholder, Spaces } from "@jstemplate/ecommerce-ui";

interface BlogContentProps {
  data?: any;
}

export const BlogContent = ({ data }: BlogContentProps) => {
  return (
    <div>
      <div className="mb-4">
        {data?.category ? (
          <div className="flex flex-wrap items-center gap-1.5">
            {data?.category.map((singleData: any, index: number) => (
              <Badge key={index} className="rounded" size="sm" intent="primary">
                {singleData?.name}
              </Badge>
            ))}
          </div>
        ) : (
          <Skeleton width={86} />
        )}
      </div>
      {data?.title ? <Heading1 intent="bold">{data?.title}</Heading1> : <Skeleton height={30} />}
      <div className="mt-5 mb-10">
        {data?.publishTime ? (
          <>
            <div className="flex items-center gap-6">
              <BodyText size="sm" intent="medium" className="text-themeGray uppercase">
                BY:{" "}
                <Link href="/" className="transition hover:text-themePrimary600 hover:duration-700">
                  {data?.author}
                </Link>
              </BodyText>
              <div className="flex  gap-2">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M4.625 1.5V3.375M13.375 1.5V3.375M1.5 14.625V5.25C1.5 4.75272 1.69754 4.27581 2.04917 3.92417C2.40081 3.57254 2.87772 3.375 3.375 3.375H14.625C15.1223 3.375 15.5992 3.57254 15.9508 3.92417C16.3025 4.27581 16.5 4.75272 16.5 5.25V14.625M1.5 14.625C1.5 15.1223 1.69754 15.5992 2.04917 15.9508C2.40081 16.3025 2.87772 16.5 3.375 16.5H14.625C15.1223 16.5 15.5992 16.3025 15.9508 15.9508C16.3025 15.5992 16.5 15.1223 16.5 14.625M1.5 14.625V8.375C1.5 7.87772 1.69754 7.40081 2.04917 7.04917C2.40081 6.69754 2.87772 6.5 3.375 6.5H14.625C15.1223 6.5 15.5992 6.69754 15.9508 7.04917C16.3025 7.40081 16.5 7.87772 16.5 8.375V14.625"
                    stroke="#64748B"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <BodyText size="sm" intent="medium" className="text-themeGray">
                  {moment(data?.publishTime).startOf("hour").fromNow()}
                </BodyText>
              </div>
            </div>
          </>
        ) : (
          <Skeleton width={150} />
        )}
      </div>
      {data?.featuredmedia?.sourceUrl ? (
        <>
          <Placeholder
            src={data?.featuredmedia?.sourceUrl}
            className="rounded-xl"
            imageHeight={500}
            imageWidth={890}
            alt={data?.featuredmedia?.alt}
          />
        </>
      ) : (
        <Skeleton height={500} />
      )}
      <Spaces size="xss" />
      <Element>
        {data?.content &&
          parse(data?.content, {
            replace: (domNode: any) => {
              if (domNode.name === "img") {
                return (
                  <Image
                    src={domNode.attribs.src}
                    width={domNode.attribs.width}
                    height={domNode.attribs.height}
                    alt={domNode.attribs.alt}
                    priority={true}
                    className="w-full"
                  />
                );
              }
            },
          })}
      </Element>
    </div>
  );
};

const Element = styled.div`
  p {
    font-size: 18px;
    color: #52525b;
    padding: 10px 0;
  }

  h1 {
    color: #18181b;
    font-weight: 700;
    font-size: 28px;
    padding: 4px 0;
  }
  h2 {
    color: #18181b;
    font-weight: 700;
    font-size: 24px;
    padding: 4px 0;
  }
  h3 {
    color: #18181b;
    font-weight: 700;
    font-size: 20px;
    padding: 4px 0;
  }
  h4 {
    color: #18181b;
    font-weight: 600;
    font-size: 16px;
    padding: 4px 0;
  }
  h5 {
    color: #18181b;
    font-weight: 600;
    font-size: 14px;
    padding: 4px 0;
  }
  h6 {
    color: #18181b;
    font-weight: 500;
    font-size: 13px;
    padding: 4px 0;
  }
  span {
    color: #18181b;
    font-weight: 400;
    font-size: 16px;
    padding: 4px 0;
  }
`;
