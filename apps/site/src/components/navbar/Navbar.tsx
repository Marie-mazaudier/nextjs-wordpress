import React from "react";
import { NavbarBottom } from "./NavbarBottom";
import dynamic from "next/dynamic";

const TopNavbar = dynamic(() => import("./TopNavbar"), {
  ssr: false,
});

const MiddleNavbar = dynamic(() => import("./MiddleNavbar"), {
  ssr: false,
});

const BottomNavbarMenu = dynamic(() => import("./BottomNavbarMenu"), {
  ssr: false,
});

interface NavbarProps {
  category?: any;
  cartData?: any;
  className?: string;
}

const Navbar = ({ category, cartData }: NavbarProps) => {
  const [LoginmodalOn, setLoginModalOn] = React.useState(false);

  return (
    <>
      <header className="z-[99] relative">
        {/*<TopNavbar LoginmodalOn={LoginmodalOn} setLoginModalOn={setLoginModalOn} />*/}
        <MiddleNavbar cartData={cartData} LoginmodalOn={LoginmodalOn} setLoginModalOn={setLoginModalOn} />
        {/*  <NavbarBottom category={category} />
        <div className="fixed bottom-0 md:hidden  w-full">
          <BottomNavbarMenu category={category} cartData={cartData} />
        </div>*/}
      </header >
    </>
  );
};

export default Navbar;
