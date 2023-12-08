import React from "react";
import { BodyText } from "../typography/bodyText/BodyText";
import { DisplayText3 } from "../typography/displayText/DisplayText3";
import Link from "next/link";
import { useRouter } from "next/router";

export const BreadcrumbTwo = () => {
  const router = useRouter();
  const segments = router.pathname.split("/");
  const replaceName = segments[segments.length - 1]?.replace(/-/g, " ");

  return (
    <div className="bg-themWhite h-52 flex items-center">
      <div className="container mx-auto px-5 sm:px-0">
        <div className="grid sm:flex items-center justify-between w-full">
          <div>
            <DisplayText3 intent="bold" className="capitalize">
              {replaceName}
            </DisplayText3>
            <BodyText size="lg" className="text-[#475569] mt-2">
              Something different, every day.
            </BodyText>
          </div>
          <div className="flex items-center gap-4 mt-5 sm:mt-0">
            <Link href="/">
              <BodyText
                size="md"
                className="text-[#475569] hover:text-themePrimary600 transition hover:duration-700 capitalize"
              >
                Home
              </BodyText>
            </Link>
            <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M4.97656 5.99999L0.851562 1.87499L2.0299 0.696655L7.33323 5.99999L2.0299 11.3033L0.851562 10.125L4.97656 5.99999Z"
                fill="#475569"
              />
            </svg>
            <BodyText size="md" className="text-[#475569] capitalize">
              {replaceName}
            </BodyText>
          </div>
        </div>
      </div>
    </div>
  );
};
