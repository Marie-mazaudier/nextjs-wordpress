import React, { FC } from "react";
import { cva } from "class-variance-authority";


interface pageContentChildren {
  children: React.ReactNode;
  sidebar?: "yes" | "no";
}

const colStyle = cva([""], {
  variants: {
    sidebar: {
      yes: ["w-full lg:w-9/12"],
      no: ["col-span-3"],
    },
  },
  defaultVariants: {
    sidebar: "yes",
  },
});



export const PageContent: FC<pageContentChildren> = ({ children ,sidebar}) => {
    return <div className={`${colStyle({ sidebar })}`}>{children}</div>;
};
