import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function setPassword(req: NextApiRequest, res: NextApiResponse) {
    // Accepter uniquement les requêtes POST
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { email, code, password } = req.body;

    // Valider l'email fourni
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    try {
        // Envoyer la demande de réinitialisation de mot de passe au plugin WordPress
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/wp-json/bdpwr/v1/set-password`, {
            email: email,
            code: code, // Assurez-vous que cette valeur est récupérée correctement
            password: password, // De même pour le mot de passe
        });

        // Réponse réussie de WordPress
        return res.status(200).json(response.data);
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            // Réponse d'erreur de WordPress
            return res.status(error.response.status).json(error.response.data);
        } else {
            // Erreur inattendue
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
}
