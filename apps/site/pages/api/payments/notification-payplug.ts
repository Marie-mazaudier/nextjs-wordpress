// pages/api/payments/notification-payplug.js
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from "next";
import { WooCommerce } from "../../../lib/utils/woocommerce";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { id, object, is_live } = req.body;

        if (!id || object !== "payment") {
            return res.status(400).json({ error: "Invalid notification data" });
        }

        const payplugAPIUrl = `${process.env.NEXT_PUBLIC_PAYPLUG_API_URL}/${id}`;

        try {
            const payplugResponse = await axios.get(payplugAPIUrl, {
                headers: { 'Authorization': `Bearer ${process.env.PAYPLUG_SECRET_KEY}` }
            });

            const paymentDetails = payplugResponse.data;

            // Utilisez les métadonnées pour retrouver l'ID de commande associé au paiement PayPlug
            const expectedOrderId = paymentDetails.metadata.customer_id; // Assurez-vous que cela correspond à votre structure de métadonnées

            if (paymentDetails.is_paid) {
                const updateResponse = await WooCommerce.put(`orders/${expectedOrderId}`, {
                    status: 'completed',
                    transaction_id: id
                });

                if (updateResponse.data) {
                    return res.status(200).json({ message: "PayPlug payment validated and order updated successfully." });
                } else {
                    return res.status(400).json({ error: "Failed to update order status for PayPlug payment." });
                }
            } else {
                return res.status(400).json({ error: "Payment not valid or not completed." });
            }
        } catch (error) {
            console.error('Error during PayPlug payment validation or order update:', error);
            return res.status(500).json({ error: "Internal server error while processing PayPlug notification." });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
