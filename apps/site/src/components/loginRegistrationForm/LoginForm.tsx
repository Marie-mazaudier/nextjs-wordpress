import React from "react";
import { Button, BodyText, Heading3 } from "@jstemplate/ecommerce-ui";
import { useForm, SubmitHandler } from "react-hook-form";
import { FormLoader } from "../formLoader/FormLoader";
import { useToasts } from "react-toast-notifications";
import { getCookie, setCookies } from "cookies-next";
import axios from "axios";

type FormValues = {
  username?: string;
  password?: string;
  remember?: boolean;
  onSubmit: (data?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
  setLoginModalOn?: any;
};

interface LoginFormProps {
  setLoginModalOn?: any;
}

const LoginForm = ({ setLoginModalOn }: LoginFormProps) => {
  const { addToast } = useToasts();
  let get_form_info: any = getCookie("created__user__info");
  if (get_form_info) {
    get_form_info = JSON.parse(get_form_info);
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const [loading, setLoading] = React.useState(false);
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true);
    await axios
      .post("/api/auth/login", data)
      .then((response) => {
        if (response?.data?.status === 400) {
          addToast("You are not allowed.Because you are not a customer", {
            appearance: "error",
            autoDismiss: true,
            autoDismissTimeout: 3000,
          });
          setLoading(false);
        } else {
          addToast("Login Successfully", {
            appearance: "success",
            autoDismiss: true,
            autoDismissTimeout: 3000,
          });
          if (!getCookie("__user__login__info")) {
            const logInfo = {
              username: response.data?.data?.display_name,
              email: response.data?.data?.email,
              id: response.data?.data?.user_id,
              role: response.data?.data?.role,
              avatar: response.data?.data?.avatar_urls,
            };
            if (data?.remember != false) {
              setCookies("__user__login__info", logInfo, { maxAge: 60 * 60 * 24 * 7 }); // 7 days
            } else {
              setCookies("__user__login__info", logInfo);
            }
          }
          setLoading(false);
          reset();
          setLoginModalOn(false);
        }
      })
      .catch((err) => {
        addToast(err.response.data.message, {
          appearance: "error",
          autoDismiss: true,
          autoDismissTimeout: 2000,
          description: err.response.data.description,
        });
        setLoading(false);
      });
  };

  return (
    <div>
      <Heading3 intent="medium" className="text-center text-themeSecondary800">
        Sign In
      </Heading3>
      <BodyText size="md" className=" text-center text-themeSecondary500 mt-1">
        Enter your login information
      </BodyText>
      <div className="mt-7">
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            id="email"
            className={`px-5 py-3 rounded-lg outline-none border bg-white text-xl  placeholder:text-lg w-full ${errors.username ? "border-red-500" : "border-themeSecondary300"
              }`}
            defaultValue={get_form_info?.username}
            placeholder="Username or Email"
            {...register("username", { required: true })}
          />
          <input
            type="password"
            id="password"
            className={`px-5 py-3 rounded-lg outline-none border bg-white text-xl  placeholder:text-lg w-full mt-6 ${errors.password ? "border-red-500" : "border-themeSecondary300"
              }`}
            placeholder="Password"
            {...register("password", { required: true })}
          />
          <div className="my-6 flex items-center justify-between">
            <label className="text-base cursor-pointer">
              <input type="checkbox" className="w-4 h-4 cursor-pointer" id="remember" {...register("remember")} />
              <span className=" ml-2"> Remember me</span>
            </label>
            {/* <BodyText size="md" className=" text-themePrimary600 cursor-pointer">
              Forgot Password?
            </BodyText> */}
          </div>
          <Button
            className={`flex gap-4 items-center justify-center w-full mt-6 ${loading ? "bg-themeSecondary800" : ""}`}
          >
            {loading ? <FormLoader /> : ""}
            {loading ? "Processing..." : "Sign in"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
