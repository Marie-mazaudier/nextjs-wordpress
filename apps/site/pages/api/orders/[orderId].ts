// pages/api/orders/[orderId].ts
import { NextApiRequest, NextApiResponse } from "next";
import { WooCommerce } from "../../../lib/utils/woocommerce";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { orderId } = req.query;

    if (req.method === 'GET') {
        try {
            const response = await WooCommerce.get(`orders/${orderId}`);
            res.status(200).json(response.data);
        } catch (error) {
            res.status(404).json({ error: "Commande non trouvée" });
        }
    } else {
        // Gère les autres méthodes HTTP non prises en charge ici
        res.setHeader('Allow', ['GET', 'PUT']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
