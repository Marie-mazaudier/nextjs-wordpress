import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormLoader } from "../formLoader/FormLoader";
import { useCocartLogout } from "../../../lib/coCart/auth";
import { deleteCookie } from "cookies-next";
import { useToasts } from "react-toast-notifications";
import { BodyText, Placeholder } from "@jstemplate/ecommerce-ui";

interface DashboardSideBarProps {
  sidebarMenu?: {
    title?: string;
    icon?: JSX.Element;
    link: string;
  }[];
  userData?: {
    username: string;
    email: string;
    id: number;
    role: string;
    remember: boolean;
    avatar: string;
    avatar_url?: any;
  };
  loading?: boolean;
  // setIndex?: React.Dispatch<React.SetStateAction<number>> | any;
}

const DashboardSideBar = ({ sidebarMenu, userData }: DashboardSideBarProps) => {
  const router = useRouter();

  const { addToast } = useToasts();

  const { logout, loading } = useCocartLogout();

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
    <>
      {/* large device dashboard */}
      <div className="w-56 p-5 border rounded-2xl lg:w-80 shrink-0 border-themeSecondary200 hidden lg:block">
        <div className="flex flex-wrap items-center gap-4 p-4 lg:flex-nowrap rounded-xl bg-themeSecondary100">
          <Placeholder
            className="rounded-lg shrink-0"
            src={`${userData?.avatar_url ? userData?.avatar_url : "/user.jpg"}`}
            imageWidth={60}
            imageHeight={60}
          />
          <div>
            <BodyText intent="semibold" className="text-base lg:text-xl text-themeSecondary800">
              {userData?.username}
            </BodyText>
            <Link href="/dashboard/account-settings">
              <BodyText size="sm" intent="medium" className="mt-1 text-themePrimary600">
                Edit
              </BodyText>
            </Link>
          </div>
        </div>
        <div className="mt-5">
          {sidebarMenu?.map((item, index) => (
            <Link key={index} href={`${item?.link}`}>
              <div
                className={`flex items-center gap-4 p-4 rounded-lg cursor-pointer ${
                  item?.link === router.pathname && "bg-themePrimary600 transition duration-500 ease-in-out"
                }`}
              >
                <p className={`${item?.link === router.pathname ? "text-white" : "text-themeSecondary600"}`}>
                  {item.icon}
                </p>
                <BodyText
                  size="lg"
                  className={`${item?.link === router.pathname ? "text-white" : "text-themeSecondary600"}`}
                >
                  {item.title}
                </BodyText>
              </div>
            </Link>
          ))}
          {userData ? (
            <div
              onClick={handleLogout}
              className="flex items-center gap-4 p-4 rounded-lg cursor-pointer group hover:bg-themePrimary600 transition duration-500 ease-in-out"
            >
              {loading ? (
                <FormLoader />
              ) : (
                <svg
                  className="text-themeSecondary600 group-hover:text-white transition duration-500 ease-in-out"
                  width="22"
                  height="20"
                  viewBox="0 0 22 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 2.81829e-06 10 2.81829e-06C11.5527 -0.00116364 13.0842 0.359775 14.4729 1.05414C15.8617 1.74851 17.0693 2.75718 18 4H15.29C14.1352 2.98176 12.7112 2.31836 11.1887 2.0894C9.66625 1.86044 8.11007 2.07566 6.70689 2.70922C5.30371 3.34277 4.11315 4.36776 3.27807 5.66119C2.44299 6.95462 1.99887 8.46153 1.999 10.0011C1.99913 11.5407 2.4435 13.0475 3.27879 14.3408C4.11409 15.6341 5.30482 16.6589 6.7081 17.2922C8.11139 17.9255 9.66761 18.1405 11.19 17.9113C12.7125 17.6821 14.1364 17.0184 15.291 16H18.001C17.0702 17.243 15.8624 18.2517 14.4735 18.9461C13.0846 19.6405 11.5528 20.0013 10 20ZM17 14V11H9V9H17V6L22 10L17 14Z"
                    fill="currentColor"
                  />
                </svg>
              )}

              <BodyText
                size="lg"
                className="flex items-center gap-3 text-themeSecondary600 group-hover:text-white transition duration-500 ease-in-out"
              >
                {loading ? "Processing..." : "Logout"}
              </BodyText>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>

      {/* small device dashboard */}
      <div className="flex justify-center items-center gap-1.5 p-3 border border-themeSecondary200 rounded-2xl cursor-pointer lg:hidden">
        {sidebarMenu?.map((item, index) => (
          <Link key={index} href={`${item?.link}`} className="w-full">
            <div
              className={`flex justify-center w-full py-5 rounded-lg cursor-pointer ${
                item?.link === router.pathname && "bg-themePrimary600 transition duration-500 ease-in-out"
              }`}
            >
              <p className={`${item?.link === router.pathname ? "text-white" : "text-themeSecondary600"}`}>
                {item.icon}
              </p>
            </div>
          </Link>
        ))}
        <div
          onClick={handleLogout}
          className="flex justify-center w-full py-5 rounded-lg cursor-pointer group hover:bg-themePrimary600 transition duration-500 ease-in-out"
        >
          <svg
            className="text-themeSecondary600 group-hover:text-white transition duration-500 ease-in-out"
            width="22"
            height="20"
            viewBox="0 0 22 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 2.81829e-06 10 2.81829e-06C11.5527 -0.00116364 13.0842 0.359775 14.4729 1.05414C15.8617 1.74851 17.0693 2.75718 18 4H15.29C14.1352 2.98176 12.7112 2.31836 11.1887 2.0894C9.66625 1.86044 8.11007 2.07566 6.70689 2.70922C5.30371 3.34277 4.11315 4.36776 3.27807 5.66119C2.44299 6.95462 1.99887 8.46153 1.999 10.0011C1.99913 11.5407 2.4435 13.0475 3.27879 14.3408C4.11409 15.6341 5.30482 16.6589 6.7081 17.2922C8.11139 17.9255 9.66761 18.1405 11.19 17.9113C12.7125 17.6821 14.1364 17.0184 15.291 16H18.001C17.0702 17.243 15.8624 18.2517 14.4735 18.9461C13.0846 19.6405 11.5528 20.0013 10 20ZM17 14V11H9V9H17V6L22 10L17 14Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>
    </>
  );
};

export default DashboardSideBar;
