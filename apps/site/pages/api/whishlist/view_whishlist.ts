import { NextApiRequest, NextApiResponse } from "next";
import { WooCommerce } from "../../../lib/utils/woocommerce";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    // Utilisation du nouvel endpoint
    const { userID } = req.query;

    const { data } = await WooCommerce.get(`wishlist/get_by_user/${userID}`);
    res.status(200).json(data);
}