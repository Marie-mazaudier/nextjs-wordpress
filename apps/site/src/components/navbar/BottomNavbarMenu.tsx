import { getCookie } from "cookies-next";
import Link from "next/link";
import React, { useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { RiShoppingCartFill } from "react-icons/ri";
import { TbGridDots } from "react-icons/tb";
import CategorySubMenu from "./CategorySubMenu";
import SearchNavMenu from "./SearchNavMenu";

interface BottomNavbarMenuProps {
  category?: any;
  cartData?:any
}
const BottomNavbarMenu = ({ category, cartData }: BottomNavbarMenuProps) => {
  const [open, setOpen] = useState(false);
  const [searchOpen, setsearchOpen] = useState(false);
  const [index, setIndex] = useState(0);

  let get_form_info: any = getCookie("__user__login__info");
  if (get_form_info) {
    get_form_info = JSON.parse(get_form_info);
  }
  return (
    <section>
      <nav className="flex items-center justify-between bg-white p-5 shadow-boxShaddowxl">
        <Link href="/">
          <AiFillHome className="text-2xl text-themeSecondary700 hover:text-themePrimary600 transition hover:duration-700" />
        </Link>
        <div onClick={() => setIndex(1)}>
          <FiSearch
            className="text-2xl text-themeSecondary700 hover:text-themePrimary600 transition hover:duration-700"
            onClick={() => setsearchOpen(!searchOpen)}
          />
        </div>
       
        {get_form_info ? (
          <Link href="/dashboard" className="py-2">
            <BiUser className="text-2xl text-themeSecondary700 hover:text-themePrimary600 transition hover:duration-700 cursor-pointer" />
          </Link>
        ) : (
          ""
        )}
        <Link href="/cart" className=" relative group">
          <div>
            <RiShoppingCartFill className="text-2xl text-themeSecondary700 group-hover:text-themePrimary600 transition group-hover:duration-700" />
            <div className="text-white text-sm bg-themePrimary600 rounded-full px-2 w-fit absolute -top-5 left-5">
              {cartData?.items?.length > 0 ? cartData?.items?.length : 0}
            </div>
          </div>
        </Link>
        <div onClick={() => setIndex(0)}>
          <TbGridDots
            className="text-2xl text-themeSecondary700 hover:text-themePrimary600 transition hover:duration-700"
            onClick={() => setOpen(!open)}
          />
        </div>
      </nav>
      {/* category result left to right menu */}
      <nav>
        <div className="block lg:hidden">
          <div
            className={`overflow-y-auto z-40 flex pt-5 top-0 flex-col h-screen w-full max-w-[300px] fixed bg-white  duration-500  ease-in-out  gap-2 md:gap-0 ${
              open ? "left-0" : "-left-full"
            }`}
          >
            {index === 0 && <CategorySubMenu category={category} setOpen={setOpen} />}
          </div>
        </div>
        <div
          className={`lg:hidden fixed top-0 z-30 transition-all duration-500 ease-in-out  bg-[#868687] opacity-80 h-full w-full ${
            open ? "left-0" : "-left-full"
          }`}
          onClick={() => setOpen(!open)}
        />
      </nav>
      {/* search top to bottom menu */}
      <nav>
        <div className="block lg:hidden">
          <div
            className={`overflow-y-auto z-40 flex pt-5 top-0 flex-col h-fit w-full fixed bg-white  duration-500  ease-in-out  gap-2 md:gap-0 ${
              searchOpen ? "top-0" : "-top-full"
            }`}
          >
            {index === 1 && <SearchNavMenu setsearchOpen={setsearchOpen} searchOpen={searchOpen} />}
          </div>
        </div>
        <div
          className={`lg:hidden fixed top-0 z-30 transition-all duration-500 ease-in-out  bg-[#868687] opacity-80 h-full w-full ${
            searchOpen ? "top-0" : "-top-full"
          }`}
          onClick={() => setsearchOpen(!searchOpen)}
        />
      </nav>
    </section>
  );
};

export default BottomNavbarMenu;
