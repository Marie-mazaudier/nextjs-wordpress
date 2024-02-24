// pages/api/payplug-proxy.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosError } from 'axios';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    if (req.method === 'POST') {
        try {
            const response = await axios.post('https://api.payplug.com/v1/payments', req.body, {
                headers: {
                    'Authorization': `Bearer ${process.env.PAYPLUG_SECRET_KEY}`,
                    'Content-Type': 'application/json',
                    'PayPlug-Version': '2019-08-06',
                },
            });
            res.status(200).json(response.data);
        } catch (error) {
            // Utilisation d'une assertion de type pour traiter error comme un AxiosError
            const axiosError = error as AxiosError;
            res.status(axiosError.response?.status || 500).json(axiosError.response?.data || { message: 'An error occurred' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
