import React, { FC } from "react";

interface BottomBarChildren {
  children: React.ReactNode;
}

export const BottomBar: FC<BottomBarChildren> = ({ children }) => {
  return <div className='md:w-1/2  lg:w-full'>{children}</div>;
};
