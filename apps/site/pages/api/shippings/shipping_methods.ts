import { NextApiRequest, NextApiResponse } from "next";
import { WooCommerce } from "../../../lib/utils/woocommerce";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    // Utilisation du nouvel endpoint
    const { zoneId } = req.query;

    const { data } = await WooCommerce.get("shipping/zones/1/methods");
    res.status(200).json(data);
}