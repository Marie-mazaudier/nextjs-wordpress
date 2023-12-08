import { cva } from "class-variance-authority";
import React, { Children, FC } from "react";
const h1Style = cva(["text-3xl md:text-3xl lg:text-4xl", "lg:leading-10"], {
  variants: {
    intent: {
      normal: ["font-normal"],
      medium: ["font-medium"],
      semibold: ["font-semibold"],
      bold: ["font-bold"],
    },
  },
});

export interface H1props {
  intent?: "normal" | "medium" | "semibold" | "bold";
  className?: string;
  children?: React.ReactNode;
}

export const Heading1: FC<H1props> = (props) => {
  const { intent = "normal", className = "", children = "Your Text Here" } = props;
  return <h1 className={`${h1Style({ intent })} ${className}`}>{children}</h1>;
};
