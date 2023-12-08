import { cva } from "class-variance-authority";
import { FC } from "react";
const d4Style = cva(
  [" text-xl md:text-3xl lg:text-7xl"],
  {
    variants: {
      intent: {
        regular: ["font-normal"],
        bold: ["font-bold"],
        black: ["font-black"],
      },
    },
  }
);

export interface D4props {
  intent?: "regular" | "bold" | "black";
  className?: string;
  children?: React.ReactNode;
}

export const DisplayText4: FC<D4props> = (props) => {
  const {
    intent = "regular",
    className = "",
    children = "Your Text here",
  } = props;
  return <h3 className={`${d4Style({ intent })} ${className}`}>{children}</h3>;
};
