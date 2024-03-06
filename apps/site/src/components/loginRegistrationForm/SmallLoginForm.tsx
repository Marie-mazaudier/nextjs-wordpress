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
    onSubmit: (data?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
    setLoginModalOn?: any;
};

interface SmallLoginFormProps {
    setLoginModalOn?: any;
}

const SmallLoginForm = ({ setLoginModalOn }: SmallLoginFormProps) => {
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

                    }
                    setLoading(false);
                    reset();
                    setLoginModalOn(false);
                }
            })
            .catch((err) => {
                const errorMessage = err.response && err.response.data && err.response.data.message
                    ? err.response.data.message
                    : "Une erreur s'est produite lors de la connexion."; // Message d'erreur par défaut si `err.response.data.message` n'est pas disponible
                const errorDescription = err.response && err.response.data && err.response.data.description
                    ? err.response.data.description
                    : ""; // Description d'erreur par défaut si `err.response.data.description` n'est pas disponible

                addToast(errorMessage, {
                    appearance: "error",
                    autoDismiss: true,
                    autoDismissTimeout: 2000,
                    description: errorDescription,
                });
                setLoading(false);
            });
    };

    return (
        <div>
            <div className="mt-7 mb-8">
                <form action="" onSubmit={handleSubmit(onSubmit)}>
                    <div className="lg:flex justify-between items-center">

                        <input
                            type="text"
                            id="email"
                            className={`px-5 py-3 rounded-lg outline-none border bg-white text-xl  placeholder:text-lg w-full ${errors.username ? "border-red-500" : "border-themeSecondary300"
                                }`}
                            defaultValue={get_form_info?.username}
                            placeholder="Identifiant or Email"
                            {...register("username", { required: true })}
                        />
                        <input
                            type="password"
                            id="password"
                            className={`px-5 py-3 ml-3 mr-3 rounded-lg outline-none border bg-white text-xl  placeholder:text-lg w-full  ${errors.password ? "border-red-500" : "border-themeSecondary300"
                                }`}
                            placeholder="Mot de passe"
                            {...register("password", { required: true })}
                        />

                        <Button
                            className={`flex gap-4 rounded-lg sm:w-1/2 items-center justify-center w-full  ${loading ? "bg-themeSecondary800" : ""}`}
                        >
                            {loading ? <FormLoader /> : ""}
                            {loading ? "Processing..." : "Sign in"}
                        </Button>

                    </div>

                </form>
            </div>
        </div>
    );
};

export default SmallLoginForm;
