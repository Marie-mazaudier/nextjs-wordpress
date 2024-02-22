// pages/api/payments/validate-payment.js
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from "next";
import { WooCommerce } from "../../../lib/utils/woocommerce"; // Assurez-vous que le chemin d'accès est correct

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { pid } = req.query; // Récupération de l'ID du paiement depuis la query string

        if (!pid) {
            return res.status(400).json({ error: "Payment ID (pid) is required" });
        }

        // Utilisation des variables d'environnement pour l'URL de l'API Alma et la clé API
        const almaAPIUrl = `${process.env.NEXT_PUBLIC_ALMA_API_URL_TEST}/v1/payments/${pid}`;
        const almaAPIKey = process.env.NEXT_PUBLIC_ALMA_API_KEY;

        try {
            // Récupération des détails du paiement depuis l'API d'Alma
            const almaResponse = await axios.get(almaAPIUrl, {
                headers: {
                    'Authorization': `Alma-Auth ${almaAPIKey}`
                }
            });

            const paymentDetails = almaResponse.data;
            const expectedOrderId = paymentDetails.orders[0].merchant_reference;

            if ((paymentDetails.state === 'paid' || paymentDetails.state === 'in_progress') && expectedOrderId) {
                // Mise à jour de la commande via l'API WooCommerce
                const updateResponse = await WooCommerce.put(`orders/${expectedOrderId}`, {
                    status: 'completed',
                    transaction_id: pid
                });

                if (updateResponse.data) {
                    res.status(200).json({ message: "Payment validated and order updated successfully" });
                } else {
                    res.status(400).json({ error: "Failed to update order status" });
                }
            } else {
                res.status(400).json({ error: "Payment not valid or merchant_reference does not match" });
            }
        } catch (error) {
            console.error('Error during payment validation or order update:', error);
            res.status(500).json({ error: "Internal server error" });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
