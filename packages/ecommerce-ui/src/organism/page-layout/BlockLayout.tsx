import { cva } from 'class-variance-authority';
import React, { FC } from 'react';

export interface layoutProps {
  children?: React.ReactNode;
  Reverse?: "yes" | "no"
  layout?: "no"
}
const layoutStyle = cva(["container", "mx-auto", "px-5", "sm:px-0", "w-full"], {
  variants: {
    Reverse: {
      no: ["flex flex-col lg:flex-row gap-12"],
      yes: ["flex flex-col-reverse lg:flex-row gap-12"],
    },
    layout: {
      no: [""],
    },
  },
  defaultVariants: {
    layout: "no"
  },
});

export const BlockLayout: FC<layoutProps> = ({ children, Reverse, layout }) => {
  return (
    <div className={`${layoutStyle({ Reverse, layout })} flex justify-center`}>
      {children}
    </div>
  );
};

