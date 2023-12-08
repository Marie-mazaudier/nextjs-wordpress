import Link from "next/link";
import React from "react";
import dynamic from "next/dynamic";
import { RiArrowDownSLine } from "react-icons/ri";
import { BodyText } from "@jstemplate/ecommerce-ui";
import { getCookie, deleteCookie } from "cookies-next";
import { useCocartLogout } from "../../../lib/coCart/auth";
import { useToasts } from "react-toast-notifications";
import { useRouter } from "next/router";

const SignupSignin = dynamic(() => import("../signupSignin/SignupSignin"), {
  ssr: false,
});

interface TopNavbarProps {
  LoginmodalOn?: boolean;
  setLoginModalOn?: any;
}

const TopNavbar = ({ LoginmodalOn, setLoginModalOn }: TopNavbarProps) => {
  const { addToast } = useToasts();
  const router = useRouter();

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
    <nav className=" bg-themePrimary600">
      <div className="container items-center justify-between mx-auto lg:flex">
        <BodyText size="sm" className="text-center text-white py-4">
          Get <span className="font-bold ">20% Flat Discount</span> on Your First Order
        </BodyText>
        <div className="hidden lg:block">
          <div className="flex items-center gap-4">
            {/* <div>
              <select
                name="country"
                id="countries"
                className="text-sm font-normal py-3 text-white outline-none cursor-pointer  bg-themePrimary600"
              >
                <option value="">ENG</option>
                <option value="">BAN</option>
                <option value="">HINDI</option>
              </select>
            </div>
            <hr className=" h-4 w-0.5 bg-themePrimary300" />
            <label>
              <select
                name="country"
                id="countries"
                className="text-sm font-normal text-white outline-none cursor-pointer  py-3 bg-themePrimary600"
              >
                <option value="">USD</option>
                <option value="">EURO</option>
                <option value="">PESA</option>
              </select>
            </label>
            <hr className=" h-4 w-0.5 bg-themePrimary300" /> */}
            <Link href="#" className="flex items-center gap-1">
              <BodyText size="sm" className="text-white py-3">
                Store Location
              </BodyText>
              <RiArrowDownSLine className="text-white" />
            </Link>
            <hr className=" h-4 w-0.5 bg-themePrimary300" />
            <Link href="#" className="flex items-center gap-1">
              <BodyText size="sm" className="text-white py-3">
                Track Your Order
              </BodyText>
              <RiArrowDownSLine className="text-white" />
            </Link>
            <hr className=" h-4 w-0.5 bg-themePrimary300" />
            {!get_form_info ? (
              <div onClick={() => setLoginModalOn(true)}>
                <BodyText size="sm" className="text-white cursor-pointer py-3">
                  Login <span className=" text-themePrimary300 px-1">or</span> Registration
                </BodyText>
              </div>
            ) : (
              <div onClick={handleLogout}>
                <BodyText size="md" className="text-white cursor-pointer py-3">
                  Logout
                </BodyText>
              </div>
            )}
          </div>
        </div>
      </div>
      {!get_form_info && <SignupSignin setLoginModalOn={setLoginModalOn} LoginmodalOn={LoginmodalOn} />}
    </nav>
  );
};

export default TopNavbar;
