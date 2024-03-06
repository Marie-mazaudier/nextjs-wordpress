import { Console } from "console";

interface FieldError {
    message: string;
}

const validatePassword = (value: string): FieldError | undefined => {
    // Vérifiez si le mot de passe a au moins 8 caractères
    if (value.length < 8) {
        console.log('test')
        return { message: "Le mot de passe doit contenir au moins 8 caractères" };

    }

    // Vérifiez s'il contient au moins une lettre majuscule
    if (!/[A-Z]/.test(value)) {
        return { message: "Le mot de passe doit contenir au moins une lettre majuscule" };
    }

    // Vérifiez s'il contient au moins une lettre minuscule
    if (!/[a-z]/.test(value)) {
        return { message: "Le mot de passe doit contenir au moins une lettre minuscule" };
    }

    // Vérifiez s'il contient au moins un chiffre
    if (!/\d/.test(value)) {
        return { message: "Le mot de passe doit contenir au moins un chiffre" };
    }

    // Vérifiez s'il contient au moins un caractère spécial
    if (!/[$&+,:;=?@#|'<>.^*()%!-]/.test(value)) {
        return { message: "Le mot de passe doit contenir au moins un caractère spécial" };
    }

    // Si toutes les conditions sont satisfaites, retournez undefined pour indiquer que le mot de passe est valide
    return undefined;
};

export default validatePassword;

