import React from "react";
import { Heading1 } from "../typography/headingText/heading1";
import Skeleton from "react-loading-skeleton";
import { useRouter } from "next/router";
import Link from "next/link";
import { BodyText } from "../typography/bodyText/BodyText";

interface BreadcrumbProps {
  name?: string;
}

export const Breadcrumb = ({ name }: BreadcrumbProps) => {
  const router = useRouter();
  const segments = router.pathname.split("/").filter(Boolean);
  const replaceName = segments[segments.length - 1]?.replace(/-/g, " ");

  const renderSegment = (segment: string, index: number) => {
    const path = `/${segments.slice(0, index + 1).join("/")}`;
    const isLast = index === segments.length - 1;
    return (
      <React.Fragment key={index}>
        <Link
          href={path}
          className={`text-themeSecondary600 capitalize border-themeSecondary300 ${
            isLast ? "" : "border-r"
          } hover:text-themePrimary700 transition duration-300 ease-in-out pr-2`}
        >
          {segment}
        </Link>
      </React.Fragment>
    );
  };

  return (
    <section className="py-16 font-sans text-center bg-themeSecondary100">
      {name ? (
        <Heading1 className="capitalize" intent="bold">
          {name}
        </Heading1>
      ) : replaceName ? (
        <Heading1 className="capitalize" intent="bold">
          {replaceName}
        </Heading1>
      ) : (
        <Skeleton height={25} width={100} />
      )}
      <div className="flex items-center justify-center h-5 overflow-hidden gap-2 mx-auto mt-4">
        {segments?.length >= 3 && segments?.map((segment, index) => renderSegment(segment, index))}
        {segments?.length === 2 && (
          <>
            <div>
              <Link
                href="/"
                className="text-themeSecondary600 capitalize border-themeSecondary300 hover:text-themePrimary700 transition duration-300 ease-in-out border-r pr-2"
              >
                Home
              </Link>
            </div>

            {name ? (
              <BodyText size="md" className=" text-themeSecondary600 capitalize border-themeSecondary300 pr-2">{name}</BodyText>
            ) : (
              renderSegment(replaceName, segments.length - 1)
            )}
          </>
        )}
        {segments?.length === 1 && (
          <BodyText className="text-themeSecondary600 capitalize border-themeSecondary300" size="md">
            {replaceName}
          </BodyText>
        )}
      </div>
    </section>
  );
};

