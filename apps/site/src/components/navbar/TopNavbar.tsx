import Link from "next/link";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { RiArrowDownSLine, RiShoppingCartLine, RiShoppingCart2Line, RiUser3Line, RiUserLine } from "react-icons/ri";
import { FaFacebook, FaInstagram, FaPhone } from "react-icons/fa";
import { BiUser } from "react-icons/bi";
import { BodyText } from "@jstemplate/ecommerce-ui";
import { getCookie, deleteCookie } from "cookies-next";
import { useCocartLogout } from "../../../lib/coCart/auth";
import { useToasts } from "react-toast-notifications";
import { useRouter } from "next/router";
import { useCart } from "src/CartContext";
import CartPopup from "../cartLayout/cartPopup";
import NavSearch from "./NavSearch";
const SignupSignin = dynamic(() => import("../signupSignin/SignupSignin"), {
  ssr: false,
});


interface TopNavbarProps {
  cartData?: any;
  LoginmodalOn?: boolean;
  setLoginModalOn?: any;

}

const TopNavbar = ({ LoginmodalOn, setLoginModalOn, cartData }: TopNavbarProps) => {
  const { addToast } = useToasts();
  const router = useRouter();
  const [isCartPopupOpen, setCartPopupOpen] = useState(false); // État de la fenêtre contextuelle
  const { cart } = useCart();
  const [open, SetOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  let get_form_info: any = getCookie("__user__login__info");
  if (get_form_info) {
    get_form_info = JSON.parse(get_form_info);
  }

  // Fonction pour ouvrir/fermer la fenêtre contextuelle
  const handleCartPopupToggle = () => {
    setCartPopupOpen(!isCartPopupOpen);
  };

  useEffect(() => {
    // Function to handle scroll event
    const handleScroll = () => {
      const offset = window.scrollY;
      // Set the state based on the scroll position
      setIsSticky(offset > 0);
    };
    // Attach the event listener
    window.addEventListener('scroll', handleScroll);
    // Remove the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <nav className={`py-2 ${isSticky ? 'sticky' : ''}`}>
      <div className={`container items-center justify-between mx-auto lg:flex `}>
        <div className="container items-center flex-start justify-left mx-auto gap-2 lg:flex">
          <FaInstagram className={`h-4 w-4 white-menu-icon ${isSticky ? 'black-menu-icon' : 'white-menu-icon'}`} />
          <FaFacebook className={`h-4 w-4 white-menu-icon ${isSticky ? 'black-menu-icon' : 'white-menu-icon'}`} />
          <FaPhone className={`h-3 w-3 scale-x-[-1] white-menu-icon ${isSticky ? 'black-menu-icon' : 'white-menu-icon'}`} />
        </div>
        <div className="hidden lg:block">
          <div className="flex gap-2 items-center">
            { /* <NavSearch />*/}
            {get_form_info ? (
              <Link href="/dashboard" className="py-2">
                <RiUser3Line className={`h-4 w-4  hover:text-themePrimary600 transition hover:duration-700 cursor-pointer `} />
              </Link>
            ) : (
              <RiUser3Line
                onClick={() => setLoginModalOn(true)}
                className={`h-5 w-5  hover:text-themePrimary600 transition hover:duration-700 cursor-pointer `}
              />
            )}
            {/* Icône du panier */}
            <div className="py-2 bg-transparent rounded-md group cursor-pointer relative" onClick={handleCartPopupToggle}>
              <RiShoppingCartLine className={`h-5 w-5 text-themeSecondary700 group-hover:text-themePrimary600 transition group-hover:duration-700 black-menu-icon`} />
              <div>
                <div className="text-white text-[10px] bg-themePrimary600 rounded-full px-[5px] left-[15px] w-fit absolute top-[0%]">
                  {cart.totalQuantity > 0 ? cart.totalQuantity : 0}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Fenêtre contextuelle du panier */}
        {isCartPopupOpen && <CartPopup onClose={handleCartPopupToggle} />}
      </div>
    </nav>
  );
};

export default TopNavbar;
