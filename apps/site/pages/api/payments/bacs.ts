// pages/api/payment_gateways/bacs.ts
import { NextApiRequest, NextApiResponse } from "next";
import { WooCommerce } from "../../../lib/utils/woocommerce";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            // Récupérer les détails du gateway de paiement BACS
            const { data } = await WooCommerce.get("bacs-details");

            // Vérifier si les données sont récupérées avec succès
            if (data) {
                res.status(200).json(data);
            } else {
                res.status(404).json({ message: "BACS payment gateway information not found." });
            }
        } catch (error) {
            console.error("Error fetching BACS payment gateway information:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
