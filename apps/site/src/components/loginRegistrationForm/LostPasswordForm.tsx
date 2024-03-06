import React, { useState } from "react";
import { Button, BodyText, Heading3 } from "@jstemplate/ecommerce-ui";
import { FormLoader } from "../formLoader/FormLoader";
import { useForm, SubmitHandler } from "react-hook-form";
import { useToasts } from "react-toast-notifications";

type FormValues = {
    email: string; // Assurez-vous que l'email est requis pour ce formulaire
};

interface ResetPasswordFormProps {
    setActive: (active: number) => void; // Utilisez un type plus spécifique si possible
}

const ResetPasswordForm = ({ setActive }: ResetPasswordFormProps) => {
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();
    const { addToast } = useToasts();

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        setLoading(true);
        try {
            const response = await fetch('/api/auth/resetPassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: data.email }),
            });

            const responseData = await response.json();
            if (response.ok) {
                console.log('Success:', responseData);
                setActive(2); // Change l'état pour afficher le formulaire NewPasswordForm
                addToast("Code de réinitialisation envoyé par email", {
                    appearance: "success",
                    autoDismiss: true,
                    autoDismissTimeout: 2000,
                });
            } else {
                throw new Error(responseData.message || 'An error occurred');
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div>
            <Heading3 intent="medium" className="text-center text-themeSecondary800">
                Lost Password
            </Heading3>
            <BodyText size="md" className=" text-center text-themeSecondary500 mt-1">
                Enter your email
            </BodyText>
            <div className=" mt-7">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type="email"
                        id="email"
                        className={`px-5 py-3 rounded-lg outline-none border bg-white text-xl placeholder:text-lg w-full mt-6 ${errors.email ? "border-red-500" : "border-themeSecondary300"
                            }`}
                        placeholder="Email"
                        {...register("email", { required: "Email is required" })}
                    />
                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                    <Button
                        className={`flex gap-4 items-center justify-center w-full mt-6 ${loading ? "bg-themeSecondary800" : ""}`}
                    >
                        {loading && <FormLoader />}
                        {loading ? "Processing..." : "Reset Password"}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default ResetPasswordForm;
