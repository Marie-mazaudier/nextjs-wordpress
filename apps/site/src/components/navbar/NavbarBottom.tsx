import React, { useState } from "react";
import { BodyText, Placeholder } from "@jstemplate/ecommerce-ui";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiArrowDownSLine } from "react-icons/ri";
import { AiOutlineRight } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { TbGridDots } from "react-icons/tb";
import Skeleton from "react-loading-skeleton";
import dynamic from "next/dynamic";
import { MenuData, MenuDataTwo, shopData } from "./NavData";

const SignupSignin = dynamic(() => import("../signupSignin/SignupSignin"), {
  ssr: false,
});

interface NavbarBottomProps {
  category?: any;
}
export const NavbarBottom = ({ category }: NavbarBottomProps) => {
  const [open, SetOpen] = useState(false);
  const [LoginmodalOn, setLoginModalOn] = useState(false);
  const [item, setItem] = useState("All Categories");
  return (
    <section>
      <nav className="bg-transparent border-t-2 border-themeSecondary200 border-opacity-70 hidden md:block shadow-dropShadowLg">
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
              <div className="flex justify-center gap-6">
                <Link href="/">
                  <BodyText
                    size="sm"
                    className=" blanc whitespace-nowrap hover:text-themePrimary600 transition hover:duration-700 py-4"
                  >
                    HOME
                  </BodyText>
                </Link>
                <div className="group">
                  <Link href="/shop" className="relative flex items-center justify-center gap-1">
                    <BodyText
                      size="sm"
                      className=" blanc whitespace-nowrap group-hover:text-themePrimary600 transition group-hover:duration-700 py-4"
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
                              className=" blanc whitespace-nowrap hover:text-themePrimary600 transition hover:duration-700 py-3"
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
          {/*<div className="hidden lg:block">
            <div className="flex gap-1">
              {/* <BodyText
                  size="sm"
                  className=" text-themeSecondary600 whitespace-nowrap py-4"
                >
                  Need Help?
                </BodyText> */}
          {/*} <Link href="/contact-us">
                <BodyText
                  size="sm"
                  className=" blanc whitespace-nowrap hover:text-themePrimary600 transition hover:duration-700 py-4"
                >
                  Need Help? Contact Us
                </BodyText>
              </Link>
            </div>
        </div>*/}
        </div>
      </nav>
      {/* Small device Navbar section navbar section  */}
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
      </nav>
      {<SignupSignin setLoginModalOn={setLoginModalOn} LoginmodalOn={LoginmodalOn} />}
    </section >
  );
};
