import { NextApiRequest, NextApiResponse } from "next";
import { WooCommerce } from "../../../lib/utils/woocommerce";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    // Utilisation du nouvel endpoint
    const { share_key } = req.query;

    const { data } = await WooCommerce.get(`wishlist/${share_key}/get_products`);
    res.status(200).json(data);
}