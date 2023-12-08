import { cva } from "class-variance-authority";
import React, { FC } from "react";
const h3Style = cva(["text-xl md:text-3xl", "sm:leading-8"], {
  variants: {
    intent: {
      normal: ["font-normal"],
      medium: ["font-medium"],
      semibold: ["font-semibold"],
      bold: ["font-bold"],
    },
  },
});

export interface H3props {
  intent?: "normal" | "medium" | "semibold" | "bold";
  className?: string;
  children?: React.ReactNode;
}

export const Heading3: FC<H3props> = (props) => {
  const { intent = "normal", className = "", children = "Your Text Here" } = props;
  return <h3 className={`${h3Style({ intent })} ${className}`}>{children}</h3>;
};
