import { cva } from "class-variance-authority";
import { FC } from "react";
const InputStyle = cva(["font-normal"], {
  variants: {
    size: {
      xs: ["text-xs", "leading-5", "px-3", "py-2"],
      sm: ["text-sm", "leading-5", "px-4", "py-2.5"],
      md: ["text-base", "leading-6", "px-5", "py-3"],
      lg: ["text-base", "leading-6", "px-5", "py-3"],
      xl: ["text-base", "leading-7", "px-6", "py-3"],
    },
    type: {
      focus: ["focus:border-themePrimary600", "bg-white", "focus:bg-white"],
      noFocus: ["outline-none", "bg-themeSecondary100"],
    },
  },
});

export interface InputProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  type?: "focus" | "noFocus";
  className?: string;
  placeholder?: string;
}

export const Input: FC<InputProps> = (props) => {
  const { size = "md", className = "", type = "noFocus", placeholder = "Placeholder" } = props;
  return <input type="text" placeholder={placeholder} className={`${InputStyle({ size, type })} ${className}`} />;
};
