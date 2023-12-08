import React, { FC } from "react";

interface SideBarChildren {
  children: React.ReactNode;
}

export const SideBar: FC<SideBarChildren> = ({ children }) => {
  return (
    <div className="w-full lg:w-3/12 md:flex md:gap-7 lg:block">
      {children}
    </div>
  );
};

