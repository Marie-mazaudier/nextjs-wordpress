import React from "react";
import { NavbarBottom } from "./NavbarBottom";
import dynamic from "next/dynamic";
import { useRouter } from 'next/router';

const TopNavbar = dynamic(() => import("./TopNavbar"), {
  ssr: false,
});

const MiddleNavbar = dynamic(() => import("./MiddleNavbars"), {
  ssr: false,
});

const BottomNavbarMenu = dynamic(() => import("./BottomNavbarMenu"), {
  ssr: false,
});

interface NavbarProps {
  category?: any;
  cartData?: any;
  className?: string;
  menuData: any; // Ajoutez une définition de
}

const Navbar = ({ category, menuData, cartData }: NavbarProps) => {
  const router = useRouter();
  // Vérifie si le chemin actuel est égal à '/' (ce qui signifierait qu'il s'agit de la page d'accueil)
  const isFrontPage = router.pathname === '/';

  const [LoginmodalOn, setLoginModalOn] = React.useState(false);
  // console.log("menuData", menuData)
  return (
    <>
      <header className={`${isFrontPage ? 'z-[99]' : 'z-1'} relative`}>
        <TopNavbar LoginmodalOn={LoginmodalOn} setLoginModalOn={setLoginModalOn} />
        <NavbarBottom />
        <MiddleNavbar cartData={cartData} menuData={menuData} LoginmodalOn={LoginmodalOn} setLoginModalOn={setLoginModalOn} />
        {/*<div className="fixed bottom-0 md:hidden  w-full">
          <BottomNavbarMenu category={category} cartData={cartData} />

  </div>*/}
      </header >
    </>
  );
};

export default Navbar;
