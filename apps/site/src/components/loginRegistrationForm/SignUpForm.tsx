import React from "react";
import { Button, BodyText, Heading3 } from "@jstemplate/ecommerce-ui";
import { FormLoader } from "../formLoader/FormLoader";
import { useCreateUser } from "../../../lib/woocommerce/user/useUser";
import { useForm, SubmitHandler } from "react-hook-form";

type FormValues = {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  onSubmit: (data?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
};

interface SignUpFormProps {
  setActive: any;
}

const SignUpForm = ({ setActive }: SignUpFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const { createUser, loading } = useCreateUser();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    createUser(data, reset, setActive);
  };

  return (
    <div>
      <Heading3 intent="medium" className="text-center text-themeSecondary800">
        Sign Up
      </Heading3>
      <BodyText size="md" className=" text-center text-themeSecondary500 mt-1">
        Enter your credential information
      </BodyText>
      <div className=" mt-7">
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            id="username"
            className={`px-5 py-3 rounded-lg outline-none border bg-white text-xl  placeholder:text-lg w-full ${
              errors.username ? "border-red-500" : "border-themeSecondary300"
            }`}
            placeholder="Username"
            {...register("username", { required: true })}
          />
          <input
            type="email"
            id="email"
            className={`px-5 py-3 rounded-lg outline-none border bg-white text-xl  placeholder:text-lg w-full mt-6 ${
              errors.email ? "border-red-500" : "border-themeSecondary300"
            }`}
            placeholder="Email"
            {...register("email", { required: true })}
          />
          <input
            type="password"
            id="password"
            className={`px-5 py-3 rounded-lg outline-none border bg-white text-xl  placeholder:text-lg w-full mt-6 ${
              errors.password ? "border-red-500" : "border-themeSecondary300"
            }`}
            placeholder="Password"
            {...register("password", { required: true })}
          />
          <input
            type="password"
            id="confirmPassword"
            className={`px-5 py-3 rounded-lg outline-none border bg-white text-xl  placeholder:text-lg w-full mt-6 ${
              errors.confirmPassword ? "border-red-500" : "border-themeSecondary300"
            }`}
            placeholder="Confirm Password"
            {...register("confirmPassword", { required: true })}
          />
          <Button
            className={`flex gap-4 items-center justify-center w-full mt-6 ${loading ? "bg-themeSecondary800" : ""}`}
          >
            {loading && <FormLoader />}
            {loading ? "Processing..." : "Sign Up"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
