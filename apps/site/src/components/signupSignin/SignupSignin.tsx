import { BodyText } from "@jstemplate/ecommerce-ui";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import dynamic from "next/dynamic";

const LostPasswordForm = dynamic(() => import("../loginRegistrationForm/LostPasswordForm"), {
  ssr: false,
});

const LoginForm = dynamic(() => import("../loginRegistrationForm/LoginForm"), {
  ssr: false,
});
const NewPasswordForm = dynamic(() => import("../loginRegistrationForm/NewPasswordForm"), {
  ssr: false,
});
interface Props {
  setLoginModalOn?: any;
  LoginmodalOn?: any;
}
const SignupSignin = ({ setLoginModalOn, LoginmodalOn }: Props) => {
  const [active, setActive] = useState<number>(0);

  //  const [login, setLogin] = useState<boolean>(false);
  //  const [register, setRegister] = useState<boolean>(false);
  //  const [lostPassword, setLostPassword] = useState<boolean>(false);

  //  // login toggle handler
  //  const loginToggle = async () => {
  //    if (register) setRegister(false);
  //    if (lostPassword) setLostPassword(false);
  //    await new Promise((resolve) => setTimeout(resolve, 300));
  //    setLogin(!login);
  //  };

  //  // register toggle handler
  //  const registerToggle = async () => {
  //    if (login) setLogin(false);
  //    await new Promise((resolve) => setTimeout(resolve, 300));
  //    setRegister(!register);
  //  };

  //  // lost password toggle handler
  //  const lostPasswordToggle = async () => {
  //    if (login) setLogin(false);
  //    await new Promise((resolve) => setTimeout(resolve, 300));
  //    setLostPassword(!lostPassword);
  //  };

  return (
    <div>
      <div
        className={`fixed w-full h-full left-0 top-0 z-20 bg-[#18181B] opacity-50  ${LoginmodalOn ? "opacity-40 visible" : "invisible scale-0 opacity-0"
          }`}
      />
      <div
        className={`fixed w-full h-full left-0 top-0 z-50 flex items-center justify-center transition-all ease-in duration-300 ${LoginmodalOn ? "scale-100 visible opacity-100" : "invisible scale-0 opacity-0"
          }`}
      >
        <div className="p-5 md:p-10 rounded-2xl w-[340px] sm:w-[440px]  xl:w-[480px] z-50 bg-white relative transition-all ease-in-out duration-300">
          <div>
            <AiOutlineClose
              className="text-xl cursor-pointer text-themeSecondary400 font-bold absolute top-4 md:top-6 right-4 hover:text-themePrimary600 transition hover:duration-700 z-10"
              onClick={() => setLoginModalOn(false)}
            />
            <div className=" flex items-center justify-center gap-20 relative">
              <div
                onClick={() => {
                  setActive(0);
                }}
              >
                <BodyText
                  size="md"
                  intent="medium"
                  className={`${active === 0 ? "text-themePrimary600" : "text-themeSecondary500"} cursor-pointer py-4`}
                >
                  Sign In
                </BodyText>
              </div>
              <div
                onClick={() => {
                  setActive(1);
                }}
              >
                <BodyText
                  size="md"
                  intent="medium"
                  className={`${active === 1 ? "text-themePrimary600" : "text-themeSecondary500"} cursor-pointer py-4`}
                >
                  Lost Password
                </BodyText>
              </div>
              <div
                className={`border border-themePrimary600 ] mt-4 absolute -bottom-0.5 w-[140px]  ${active === 0
                  ? "left-0 md:left-10 lg:left-16"
                  : "" || active === 1
                    ? "right-0 md:right-10 lg:right-16"
                    : ""
                  }`}
              ></div>
            </div>
            <div className=" flex items-center justify-center mb-7">
              <div className=" border border-themeSecondary200 w-full md:w-10/12 lg:w-8/12"></div>
            </div>
            {(active === 0 && <LoginForm setLoginModalOn={setLoginModalOn} />) ||
              (active === 1 && <LostPasswordForm setActive={setActive} />) ||
              (active === 2 && <NewPasswordForm setActive={setActive} />)}
          </div>
        </div>
        <div
          className={`fixed w-full h-full left-0 top-0 z-20 transition-all ease-in-out duration-300 ${LoginmodalOn ? "block" : "hidden"
            }`}
          onClick={() => setLoginModalOn(false)}
        />
      </div>
    </div>
  );
};

export default SignupSignin;
