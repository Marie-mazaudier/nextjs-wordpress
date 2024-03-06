import { NextApiRequest, NextApiResponse } from "next";
import { WooCommerce } from "../../../lib/utils/woocommerce";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    // Utilisation du nouvel endpoint
    const { item_id } = req.query;

    const { data } = await WooCommerce.get(`wishlist/remove_product/${item_id}`);
    res.status(200).json(data);
}