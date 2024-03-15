import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { RiShoppingCartFill } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { VscMenu } from 'react-icons/vsc';
import { BiUser } from "react-icons/bi";
import NavSearch from "./NavSearch";
import { RxCross2 } from "react-icons/rx";
import { MenuDataTwo, MenuData, shopData } from "./NavData";
import { BodyText, Placeholder } from "@jstemplate/ecommerce-ui";
import dynamic from "next/dynamic";
import { useCocartLogout } from "../../../lib/coCart/auth";
import { useToasts } from "react-toast-notifications";
import { getCookie, deleteCookie } from "cookies-next";
import { useRouter } from "next/router";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import CartPopup from "../cartLayout/cartPopup";
import { useCart } from "src/CartContext";
import { Menu } from "./Menu";
gsap.registerPlugin(ScrollTrigger);

const SignupSignin = dynamic(() => import("../signupSignin/SignupSignin"), {
  ssr: false,
});

interface MiddleNavbarProps {
  cartData?: any;
  LoginmodalOn?: boolean;
  setLoginModalOn?: any;
  category?: any;
  menuData: any; // Ajoutez une définition de

}

const MiddleNavbar = ({ cartData, LoginmodalOn, setLoginModalOn, menuData }: MiddleNavbarProps) => {
  // console.log("menuData", menuData)

  const { addToast } = useToasts();
  const router = useRouter();
  const [open, SetOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [item, setItem] = useState("All Categories");
  const [isCartPopupOpen, setCartPopupOpen] = useState(false); // État de la fenêtre contextuelle
  const { cart } = useCart();

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


  let get_form_info: any = getCookie("__user__login__info");
  if (get_form_info) {
    get_form_info = JSON.parse(get_form_info);
  }

  const { logout } = useCocartLogout();

  async function handleLogout() {
    try {
      await logout().then((res) => {
        if (res === true) {
          deleteCookie("__user__login__info");
          addToast("Your are successfully logout!", {
            appearance: "success",
            autoDismiss: true,
            autoDismissTimeout: 2000,
          });
          setTimeout(() => {
            router.push("/");
          }, 1000);
        }
      });
    } catch (error) {
      addToast("Something is wrong!", { appearance: "error", autoDismiss: true, autoDismissTimeout: 2000 });
    }
  }

  return (
    <section className={`bg-white/50 ${isSticky ? 'sticky-menu' : ''}`}>
      <nav className={` flex items-center justify-between py-3 `}>

        {/*////Module de recherche///
          <div className="relative lg:w-6/12 xl:w-5/12">
            <NavSearch />
            </div>*/}
        <div className=" container  mx-auto px-5 md:px-0 flex items-center justify-center">
          <div className="flex items-center gap-14">
            <div className="hidden lg:block">
              <Menu menuData={menuData} isSticky={isSticky} />
            </div>
          </div>
          {<GiHamburgerMenu
            className="text-2xl hidden md:block lg:hidden cursor-pointer"
            onClick={() => SetOpen(!open)}
          />}
        </div>
      </nav>
      {/* Fenêtre contextuelle du panier */}
      {isCartPopupOpen && <CartPopup onClose={handleCartPopupToggle} />}
      {/* medium device navbar section  */}

      {<SignupSignin setLoginModalOn={setLoginModalOn} LoginmodalOn={LoginmodalOn} />}
    </section>
  );
};

export default MiddleNavbar;