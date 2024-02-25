import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { purchaseAmount } = req.body;

        const options = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Alma-Auth ${process.env.ALMA_API_SECRET_KEY}`
            },
            data: {
                purchase_amount: purchaseAmount,
                queries: [
                    // Ajout des options pour 2, 3, et 4 fois sans délai de prélèvement
                    { installments_count: 2, deferred_days: 0 },
                    { installments_count: 3, deferred_days: 0 },
                    { installments_count: 4, deferred_days: 0 }
                ]
            }
        };
        const almaEligibilityUrl = `${process.env.NEXT_PUBLIC_ALMA_URL_ELIGIBILTY}`; // Utilisation de la variable d'environnement

        try {
            const response = await axios.post(almaEligibilityUrl, options.data, { headers: options.headers });
            res.status(200).json(response.data);
        } catch (error) {
            console.error('Error fetching Alma eligibility:', error);
            res.status(500).json({ error: "Internal server error" });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
