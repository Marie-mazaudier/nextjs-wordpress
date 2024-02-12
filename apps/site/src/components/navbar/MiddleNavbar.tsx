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

gsap.registerPlugin(ScrollTrigger);

const SignupSignin = dynamic(() => import("../signupSignin/SignupSignin"), {
  ssr: false,
});

interface MiddleNavbarProps {
  cartData?: any;
  LoginmodalOn?: boolean;
  setLoginModalOn?: any;
  category?: any;
}

const MiddleNavbar = ({ cartData, LoginmodalOn, setLoginModalOn }: MiddleNavbarProps) => {
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
                {/*<div className=" group">
              <div className="p-4 bg-themePrimary600 w-[280px] flex items-center justify-between relative cursor-pointer">
                <div className="flex gap-4 items-center">
                  <TbGridDots className="text-2xl text-white" />
                  <BodyText size="sm" className="text-white">
                    {item}
                  </BodyText>
                </div>
                <RiArrowDownSLine className="text-white" />
              </div>
              <div
                className=" opacity-0 invisible group-hover:opacity-100 group-hover:visible transition group-hover:duration-500
               absolute top-52 z-10  ease-in-out"
              >
                <div className=" bg-white p-4 w-[280px] rounded-b-xl shadow-lg">
                  {category?.map((singleData: any, index: number) => (
                    <Link href={`/product-category/${singleData.id}`} key={index}>
                      <div onClick={() => setItem(singleData.name)}>
                        <div className=" flex items-center justify-between mb-5 cursor-pointer text-themeSecondary700 hover:text-themePrimary600 transition hover:duration-700">
                          <div className=" flex items-center gap-4">
                            {singleData?.image ? (
                              <Placeholder src={singleData.image} imageHeight={20} imageWidth={20} />
                            ) : (
                              <Skeleton width={20} height={20} />
                            )}
                            <BodyText size="sm" className="">
                              {singleData.name}
                            </BodyText>
                          </div>
                          <AiOutlineRight className="text-base" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
*/}
                <div className="hidden lg:block">
                  <div className={`flex justify-center gap-6 ${isSticky ? 'black-menu' : 'white-menu'}`}>
                    <Link href="/">
                      <BodyText
                        size="sm"
                        className=" item whitespace-nowrap hover:text-themePrimary600 transition hover:duration-700 py-4"
                      >
                        HOME
                      </BodyText>
                    </Link>
                    <div className="group">
                      <Link href="/shop" className="relative flex items-center justify-center gap-1">
                        <BodyText
                          size="sm"
                          className=" item whitespace-nowrap group-hover:text-themePrimary600 transition group-hover:duration-700 py-4"
                        >
                          SHOP
                        </BodyText>
                        <RiArrowDownSLine className=" text-lg  blanc whitespace-nowrap group-hover:text-themePrimary600 transition group-hover:duration-700" />
                      </Link>
                      <div
                        className=" opacity-0 invisible group-hover:opacity-100 group-hover:visible transition group-hover:duration-500
               absolute  z-10  ease-in-out"
                      >
                        <div className=" bg-white px-4 w-[200px] rounded-b-xl shadow-lg">
                          {shopData?.map((singleData: any, index: number) => (
                            <Link href={singleData.Link} key={index}>
                              <div className=" flex items-center justify-between cursor-pointer text-themeSecondary700 hover:text-themePrimary600 transition hover:duration-700">
                                <BodyText
                                  size="sm"
                                  className=" item whitespace-nowrap hover:text-themePrimary600 transition hover:duration-700 py-3"
                                >
                                  {singleData.name}
                                </BodyText>
                                <AiOutlineRight className="text-base" />
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                    {MenuData.map((singleData: any, index: number) => (
                      <div key={index}>
                        <Link href={singleData.link}>
                          <BodyText
                            size="sm"
                            className=" blanc whitespace-nowrap hover:text-themePrimary600 transition hover:duration-700 py-4"
                          >
                            {singleData.name}
                          </BodyText>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <GiHamburgerMenu
                className="text-2xl hidden md:block lg:hidden cursor-pointer"
                onClick={() => SetOpen(!open)}
              />
            </div>
          </nav>
          {/* Small device Navbar section navbar section  
          <nav>
            <div className="block lg:hidden">
              <div
                className={`overflow-y-auto z-40 flex pt-5 top-0 flex-col h-screen w-full max-w-[300px] fixed bg-white  duration-500  ease-in-out  gap-2 md:gap-0 ${open ? "left-0" : "-left-full"
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

                <div className="flex items-center justify-center" onClick={() => setLoginModalOn(true)}>
                  <div onClick={() => SetOpen(!open)}>
                    <BodyText
                      size="md"
                      className=" text-themeSecondary700 cursor-pointer  mt-7 py-4 px-10 bg-themeSecondary100 rounded-lg  hover:bg-themePrimary600 transition hover:duration-500 hover:text-white "
                    >
                      Login <span className=" text-themePrimary300 px-1">or</span> Registration
                    </BodyText>
                  </div>
                </div>

                <div className=" mt-7 px-6 flex flex-col gap-5">
                  {MenuDataTwo.map((singleData: any, index: number) => (
                    <div key={index} onClick={() => SetOpen(!open)}>
                      <Link href={singleData.link}>
                        <BodyText
                          size="md"
                          intent="medium"
                          className=" text-themeSecondary600 whitespace-nowrap hover:text-themePrimary600 transition hover:duration-700"
                        >
                          {singleData.name}
                        </BodyText>
                      </Link>
                    </div>
                  ))}
                </div>
                <div className=" mt-7 border border-themeSecondary100"> </div>
                <div className=" flex items-center justify-center gap-3 mt-4">
                  <div>
                    <select
                      name="country"
                      id="countries"
                      className="text-sm font-normal py-3 text-themeSecondary600 outline-none cursor-pointer  bg-white"
                    >
                      <option value="">ENG</option>
                      <option value="">RUS</option>
                      <option value="">FRN</option>
                    </select>
                  </div>
                  <div className=" h-4 w-0.5  bg-themeSecondary400" />
                  <label>
                    <select
                      name="country"
                      id="countries"
                      className="text-sm font-normal text-themeSecondary600 outline-none cursor-pointer  py-3  bg-white"
                    >
                      <option value="">USD</option>
                      <option value="">REL</option>
                      <option value="">PESO</option>
                    </select>
                  </label>
                </div>
              </div>
            </div>
            <div
              className={`lg:hidden fixed top-0 z-30 transition-all duration-500 ease-in-out  bg-[#868687] opacity-80 h-full w-full ${open ? "left-0" : "-left-full"
                }`}
              onClick={() => SetOpen(false)}
            />
          </nav>*/}
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