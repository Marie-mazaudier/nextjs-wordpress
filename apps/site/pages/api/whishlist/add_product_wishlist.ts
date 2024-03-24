// pages/api/addToWishlist.js
import { WooCommerce } from '../../../lib/utils/woocommerce';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function addToWishlist(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { share_key } = req.query;
        const { product_id } = req.body; // Ajoutez d'autres paramètres selon besoin
        // console.log("Received addToWishlist request", { share_key, product_id });

        try {
            const data = await WooCommerce.post(`wishlist/${share_key}/add_product`, {
                product_id, // et d'autres paramètres
            });

            res.status(200).json(data.data);
        } catch (error) {
            console.error('Error adding product to wishlist:', error);
            res.status(500).json({ message: 'Error adding product to wishlist' });

        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} not allowed`);
    }
}
