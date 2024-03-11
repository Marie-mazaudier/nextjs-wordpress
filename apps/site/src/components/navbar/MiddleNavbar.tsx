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
import { AiOutlineRight } from "react-icons/ai";
import { RiArrowDownSLine } from "react-icons/ri";
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
    <section>
      <nav className={`bg-transparent flex items-center justify-between py-5  ${isSticky ? 'sticky' : ''}`}>
        <div className="container mx-auto flex justify-between px-5 md:px-0">
          <Link href="/" className="md:py-2">
            <Image
              src={isSticky ? "/logo-black.png" : "/logo-white.png"}
              alt="Logo"
              width={120}
              height={42}
              className={`logo ${isSticky ? "opaciteIn" : "opaciteOut"}`}
            />
          </Link>
          {/*////Module de recherche///
          <div className="relative lg:w-6/12 xl:w-5/12">
            <NavSearch />
            </div>*/}
          <nav className="bg-transparent   hidden md:block ">
            <div className=" container mx-auto px-5 md:px-0 flex items-center justify-center">
              <div className="flex items-center gap-14">
                <div className="hidden lg:block">
                  <Menu menuData={menuData} isSticky={isSticky} />
                </div>
              </div>
              <GiHamburgerMenu
                className="text-2xl hidden md:block lg:hidden cursor-pointer"
                onClick={() => SetOpen(!open)}
              />
            </div>
          </nav>
          {/* Small device Navbar section navbar section  */}
          <div className="hidden md:flex">
            <div className="flex gap-7 items-center">
              {get_form_info ? (
                <Link href="/dashboard" className="py-2">
                  <BiUser className={`text-2xl hover:text-themePrimary600 transition hover:duration-700 cursor-pointer ${isSticky ? 'black-menu-icon' : 'white-menu-icon'}`} />
                </Link>
              ) : (
                <BiUser
                  onClick={() => setLoginModalOn(true)}
                  className={`text-2xl  hover:text-themePrimary600 transition hover:duration-700 cursor-pointer ${isSticky ? 'black-menu-icon' : 'white-menu-icon'}`}
                />
              )}
              {/* Icône du panier */}
              <div className="py-2 bg-transparent rounded-md group cursor-pointer relative" onClick={handleCartPopupToggle}>
                <RiShoppingCartFill className={`text-2xl text-themeSecondary700 group-hover:text-themePrimary600 transition group-hover:duration-700 ${isSticky ? 'black-menu-icon' : 'white-menu-icon'}`} />
                <div>
                  <div className="text-white text-[10px] bg-themePrimary600 rounded-full px-[5px] left-[25px] w-fit absolute top-[-23%]">
                    {cart.totalQuantity > 0 ? cart.totalQuantity : 0}
                  </div>
                </div>
              </div>
              <VscMenu
                className={`text-2xl cursor-pointer ${open ? "" : ""} ${isSticky ? 'black-menu-icon' : 'white-menu-icon'}`} // Ajout de la classe conditionnelle
                onClick={() => SetOpen(!open)}
                size={32}
                strokeWidth={0.0001}
              />
            </div>
          </div>
          <VscMenu
            className={`text-2xl cursor-pointer md:hidden ${open ? "hidden" : ""}`} // Ajout de la classe hidden si open est vrai
            onClick={() => SetOpen(!open)}
            size={32} // Taille de l'icône en pixels
            strokeWidth={0.0001} // Épaisseur du trait de l'icône
          />
        </div>
      </nav>
      {/* Fenêtre contextuelle du panier */}
      {isCartPopupOpen && <CartPopup onClose={handleCartPopupToggle} />}
      {/* medium device navbar section  */}
      <nav>
        <div className="block  relative">
          <div
            className={`overflow-y-auto z-40 flex pt-5 top-0 flex-col font-Nunito h-screen w-full max-w-[300px] fixed bg-white duration-300 ease-in-out gap-2 md:gap-0 ${open ? "right-0" : "-right-full" // Changement ici pour utiliser "right" au lieu de "left"
              }`}
          >
            <div className="relative flex flex-col gap-5">
              <div className="flex items-center justify-between px-6">
                <BodyText size="lg" intent="semibold">
                  Menu
                </BodyText>
                <RxCross2
                  className=" text-themeSecondary400 font-bold text-xl cursor-pointer transition hover:text-themePrimary600  hover:duration-700"
                  onClick={() => SetOpen(!open)}
                />
              </div>
            </div>
            <div className=" mt-4 border border-themeSecondary100"> </div>
            <div className="flex items-center justify-center my-7">
              {get_form_info ? (
                <div className="flex items-center justify-start gap-3 bg-themeSecondary100 px-6 py-3 rounded-md w-full">
                  <BodyText size="lg" intent="medium" className="text-themePrimary600">
                    {get_form_info?.username}
                  </BodyText>
                </div>
              ) : (
                <div onClick={() => setLoginModalOn(true)}>
                  <div onClick={() => SetOpen(!open)}>
                    <BodyText
                      size="md"
                      className="text-themeSecondary700 cursor-pointer py-4 px-10 bg-themeSecondary100 rounded-lg hover:bg-themePrimary600 transition hover:duration-500 hover:text-white "
                    >
                      Login <span className=" text-themePrimary300 px-1">or</span> Registration
                    </BodyText>
                  </div>
                </div>
              )}
            </div>
            <div className="px-6 flex flex-col gap-5">
              {MenuDataTwo.map((singleData: any, index: number) => (
                <div key={index} onClick={() => SetOpen(!open)}>
                  <Link href={singleData.link}>
                    <BodyText
                      size="md"
                      intent="medium"
                      className=" blanc whitespace-nowrap hover:text-themePrimary600 transition hover:duration-700"
                    >
                      {singleData.name}
                    </BodyText>
                  </Link>
                </div>
              ))}
              {get_form_info && (
                <div onClick={handleLogout}>
                  <BodyText
                    size="md"
                    intent="medium"
                    className="blanc whitespace-nowrap hover:text-themePrimary600 transition hover:duration-700"
                  >
                    LogOut
                  </BodyText>
                </div>
              )}
            </div>
          </div>
        </div>
        <div
          className={`lg:hidden fixed top-0 z-30 transition-all duration-500 ease-in-out  bg-[#868687] opacity-80 h-full w-full ${open ? "left-0" : "-left-full"
            }`}
          onClick={() => SetOpen(false)}
        />
      </nav>
      {<SignupSignin setLoginModalOn={setLoginModalOn} LoginmodalOn={LoginmodalOn} />}
    </section>
  );
};

export default MiddleNavbar;