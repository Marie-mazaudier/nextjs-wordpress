import React from "react";
import { cva } from "class-variance-authority";

const SpaceStyle = cva([""], {
  variants: {
    size: {
      xss: ["mt-7"],
      xs: ["mt-10"],
      sm: ["mt-14"],
      md: ["mt-16"],
      mdd: ["mt-14 md:mt-20"],
      lg: ["mt-14 md:mt-20 lg:mt-24"],
      xl: ["mt-48"],
    },
  },
});

export interface SpacesProps {
  size?: "xss" | "xs" | "sm" | "md" | "mdd" | "lg" | "xl";
}

export const Spaces = ({ size = "xl" }: SpacesProps) => {
  return <div className={`${SpaceStyle({ size })}`}></div>;
};
