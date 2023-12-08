import React, { FC } from "react";

interface TopBarChildren {
  children: React.ReactNode;
}

export const TopBar: FC<TopBarChildren> = ({ children }) => {
  return <div className='md:w-1/2  lg:w-full'>{children}</div>;
};
