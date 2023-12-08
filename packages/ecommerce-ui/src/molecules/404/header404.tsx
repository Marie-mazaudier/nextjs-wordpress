import React from "react";
import { Button } from "../../atoms/button/Button";
import { BodyText } from "../../atoms/typography/bodyText/BodyText";
import { Heading3 } from "../../atoms/typography/headingText/heading3";
import Link from "next/link";
import { useRouter } from "next/router";

export const Header404 = () => {
  const router = useRouter();
  return (
    <div className="flex flex-wrap items-center justify-center w-full max-w-2xl mx-auto sm:flex-nowrap">
      <div className="pb-10 sm:pr-14 sm:pb-0">
        <h1 className="font-normal text-7xl text-themeSecondary900">404</h1>
      </div>
      <div className="pt-5 text-center border-t sm:text-left sm:pt-0 sm:border-t-0 sm:border-l border-themeSecondary200 sm:pl-14">
        <Heading3 intent="bold" className="text-themeSecondary900">
          Page Not Found
        </Heading3>
        <BodyText size="lg" className="mt-2 text-themeSecondary600">
          We are sorry, This page is unknown or does not exist the page you are looking for.
        </BodyText>
        <div className="flex flex-wrap items-center justify-center gap-4 mt-6 sm:flex-nowrap sm:justify-start">
          <Link href="/">
            <Button color="light" size="sm">
              Back To Home
            </Button>
          </Link>
          <div onClick={() => router.back()}>
            <Button color="light" size="sm">
              Previous Page
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
