// pages/api/payments/alma-proxy.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosError } from 'axios';

export default async function almaProxy(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    if (req.method === 'POST') {
        try {
            const almaAPIUrl = 'https://api.getalma.eu/v1/payments';
            const response = await axios.post(almaAPIUrl, req.body, {
                headers: {
                    'Authorization': `Alma-Auth ${process.env.ALMA_API_SECRET_KEY}`,
                    'Content-Type': 'application/json'
                },
            });

            res.status(200).json(response.data);
        } catch (error) {
            const axiosError = error as AxiosError;
            res.status(axiosError.response?.status || 500).json(axiosError.response?.data || { message: 'An error occurred with Alma payment.' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
