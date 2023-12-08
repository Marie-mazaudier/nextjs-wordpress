import { cva } from "class-variance-authority";
import React, { FC } from "react";
const h2Style = cva(["text-xl lg:text-3xl", "md:leading-10"], {
  variants: {
    intent: {
      normal: ["font-normal"],
      medium: ["font-medium"],
      semibold: ["font-semibold"],
      bold: ["font-bold"],
    },
  },
});

export interface H2props {
  intent?: "normal" | "medium" | "semibold" | "bold";
  className?: string;
  children?: React.ReactNode;
}

export const Heading2: FC<H2props> = (props) => {
  const { intent = "normal", className = "", children = "Your Text Here" } = props;
  return <h2 className={`${h2Style({ intent })} ${className}`}>{children}</h2>;
};
