import { cva } from "class-variance-authority";
import { FC } from "react";
import React from 'react';

const buttonStyle = cva(["font-medium", "cursor-pointer"], {
  variants: {
    size: {
      xs: ["text-sm", "px-[14px] md:px-5", "py-1.5 md:py-2"],
      sm: ["text-sm", "leading-5", "px-6", "py-2.5"],
      md: ["text-base", "leading-6", "px-6", "py-2.5"],
      lg: ["text-base", "leading-6", "px-7", "py-3"],
      xl: ["text-base", "leading-6", "px-7", "py-4"],
    },
    type: {
      round: ["rounded-none"],
      pill: ["rounded-none"],
      lg: ["rounded-none"],
    },
    color: {
      primary: ["bg-principal", "text-white", "hover:bg-secondaire transition hover:duration-700"],
      light: [
        "bg-themeSecondary100",
        "text-themeSecondary600",
        "hover:bg-secondaire hover:text-white transition hover:duration-700",
      ],
      dark: [
        "bg-principal",
        "text-white",
        "hover:bg-secondaire hover:text-white transition hover:duration-700",
      ],
      white: [
        "bg-white",
        "bg-principal",
        "hover:bg-secondaire hover:text-white transition hover:duration-700",
      ],
    },
  },
});
export interface ButtonProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  type?: "round" | "pill" | "lg";
  color?: "primary" | "light" | "dark" | "white";
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void; // Ajoutez cette ligne

}

export const Button: FC<ButtonProps> = ({
  size = "xl",
  type = "round",
  color = "primary",
  className = "",
  children = "Button",
  onClick, // Ajoutez cette ligne

}) => {
  return <button className={`${buttonStyle({ type, size, color })} ${className} ease-in-out`} onClick={onClick}> {children} </button>;
};
