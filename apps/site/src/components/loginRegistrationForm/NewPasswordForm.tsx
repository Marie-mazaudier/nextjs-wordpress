import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, BodyText, Heading3 } from "@jstemplate/ecommerce-ui";
import { useToasts } from "react-toast-notifications";

type NewPasswordFormValues = {
    email: string;
    password: string;
    code: string;
};
interface NewPasswordFormFormProps {
    setActive: (active: number) => void; // Utilisez un type plus spécifique si possible
}
const NewPasswordForm = ({ setActive }: NewPasswordFormFormProps) => {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<NewPasswordFormValues>();
    const { addToast } = useToasts();

    const onSubmit: SubmitHandler<NewPasswordFormValues> = async (data) => {
        setLoading(true);
        try {
            // Valider le code avant de définir le nouveau mot de passe
            const validationResponse = await fetch('/api/auth/validate-code', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: data.email, code: data.code }),
            });

            const validationData = await validationResponse.json();
            if (!validationResponse.ok) {
                throw new Error(validationData.message || 'Code validation failed');
            }

            // Si la validation réussit, procéder à la mise à jour du mot de passe
            const setPasswordResponse = await fetch('/api/auth/setPassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const setPasswordData = await setPasswordResponse.json();
            if (!setPasswordResponse.ok) {
                throw new Error(setPasswordData.message || 'Password update failed');
            }

            console.log('Password updated successfully:', setPasswordData);
            addToast("Mot de passe mis à jour", {
                appearance: "success",
                autoDismiss: true,
                autoDismissTimeout: 2000,
            });
            setActive(0); // Change l'état pour afficher LoginForm après la mise à jour réussie du mot de passe

        } catch (error) {
            console.error('Error:', error);
            // Gérez l'erreur, par exemple en affichant un message d'erreur
        } finally {
            setLoading(false);

        }
    };


    return (
        <div>
            <Heading3 intent="medium" className="text-center text-themeSecondary800">
                Nouveau mot de passe
            </Heading3>
            <BodyText size="md" className=" text-center text-themeSecondary500 mt-1">
                Entrez votre email, votre nouveau mot de passe et le code de validation reçu par email.
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
                    <input
                        type="password"
                        className={`px-5 py-3 rounded-lg outline-none border bg-white text-xl placeholder:text-lg w-full mt-6 ${errors.email ? "border-red-500" : "border-themeSecondary300"
                            }`}
                        placeholder="New Password"
                        {...register("password", { required: "Password is required" })}
                    />
                    {errors.password && <p>{errors.password.message}</p>}

                    <input
                        type="text"
                        className={`px-5 py-3 rounded-lg outline-none border bg-white text-xl placeholder:text-lg w-full mt-6 ${errors.email ? "border-red-500" : "border-themeSecondary300"
                            }`}
                        placeholder="Code"
                        {...register("code", { required: "Code is required" })}
                    />
                    {errors.code && <p>{errors.code.message}</p>}
                    <Button
                        className={`flex gap-4 items-center justify-center w-full mt-6 ${loading ? "bg-themeSecondary800" : ""}`}
                    >
                        {loading ? "Updating..." : "Update Password"}
                    </Button>
                </form>
            </div>
        </div>

    );
};

export default NewPasswordForm;
