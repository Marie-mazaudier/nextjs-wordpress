import { cva, VariantProps } from "class-variance-authority";
import React, { FC } from "react";
const badgeStyle = cva(["font-semibold"], {
  variants: {
    size: {
      sm: ["text-xs", "leading-4", "px-2", "py-1"],
      md: ["text-sm", "leading-5", "px-3", "py-1"],
      lg: ["text-base", "leading-5", "px-3", "py-2"],
    },

    intent: {
      primary: ["bg-themePrimary600", "text-white"],
      primarylight: ["bg-themePrimary50", "text-themePrimary600"],
      secondary: ["bg-themePrimary500", "text-white"],
      light: ["bg-white", "text-themeSecondary700"],
    },
    type: {
      round: ["rounded-md"],
      pill: ["rounded-full"],
    },
  },
});

export interface BadgeProps {
  size?: "sm" | "md" | "lg";
  intent?: "primary" | "light" | "primarylight" | "secondary";
  type?: "round" | "pill";
  className?: string;
  children?: React.ReactNode;
}

export const Badge: FC<BadgeProps> = (props) => {
  const { intent = "primary", className = "w-fit", size = "lg", children = "Badge", type = "round" } = props;
  return <p className={`${badgeStyle({ intent, size })} ${className}`}>{children}</p>;
};
