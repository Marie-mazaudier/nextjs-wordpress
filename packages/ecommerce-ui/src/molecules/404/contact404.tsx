import Link from "next/link";
import React from "react";
import { Button } from "../../atoms/button/Button";
import { Heading3 } from "../../atoms/typography/headingText/heading3";

export const Contact404 = () => {
  return (
    <div className="flex flex-wrap items-center justify-center w-full max-w-2xl gap-8 px-10 py-10 mx-auto sm:gap-0 sm:ga sm:justify-between rounded-xl mt-14 bg-themeSecondary100">
      <Heading3 className="text-themeSecondary800">Need Emergency Help</Heading3>
      <Link href="/contact-us">
        <Button color="primary" size="lg">
          Contact Us
        </Button>
      </Link>
    </div>
  );
};
