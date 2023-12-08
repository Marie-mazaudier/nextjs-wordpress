import { NextApiRequest, NextApiResponse } from "next";
import { WooCommerce } from "../../../lib/utils/woocommerce";


export default async function (req: NextApiRequest, res: NextApiResponse) { 
    const { data } = await WooCommerce.get("products/attributes");
    return res.status(200).json(data);
}