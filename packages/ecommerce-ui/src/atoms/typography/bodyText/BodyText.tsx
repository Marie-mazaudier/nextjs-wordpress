import { cva } from "class-variance-authority";
import React, { FC } from "react";

const btStyle = cva([""], {
  variants: {
    intent: {
      regular: ["font-normal"],
      medium: ["font-medium"],
      semibold: ["font-semibold"],
      bold: ["font-bold"],
    },
    size: {
      xs: ["text-xs"],
      sm: ["text-xs sm:text-sm"],
      md: ["text-base"],
      lg: ["text-lg"],
      xl: ["text-xl"],
    },
  },
});

export interface BTProps {
  intent?: "regular" | "medium" | "semibold" | "bold";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  children?: React.ReactNode;
}

export const BodyText: FC<BTProps> = (props) => {
  const {
    intent = "regular",
    size = "sm",
    className = "",
    children = "Your Text here",
  } = props;
  return (
    <p className={`${btStyle({ intent, size })} ${className}`}>{children}</p>
  );
};
