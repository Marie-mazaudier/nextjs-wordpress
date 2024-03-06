// pages/api/products/[productID].ts
import { NextApiRequest, NextApiResponse } from "next";
import { WooCommerce } from "../../../lib/utils/woocommerce";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Extraire l'ID du produit à partir des paramètres de la requête
    const { productID } = req.query;

    try {
        // Effectuer la requête à WooCommerce pour récupérer le produit par son ID
        const response = await WooCommerce.get(`products/${productID}`);
        const data = response.data;

        // Renvoyer les données du produit
        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        // Gérer le cas où le produit n'est pas trouvé ou une autre erreur survient
        return res.status(500).json({ message: "Erreur lors de la récupération du produit." });
    }
}
