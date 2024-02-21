import { NextApiRequest, NextApiResponse } from "next";
import { WooCommerce } from "../../../lib/utils/woocommerce";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    // Utilisation du nouvel endpoint
    // const { zoneId } = req.query;

    const { data } = await WooCommerce.get("payment_gateways");
    res.status(200).json(data);
}