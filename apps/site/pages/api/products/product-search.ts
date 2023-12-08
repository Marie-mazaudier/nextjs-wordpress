import { NextApiRequest, NextApiResponse } from "next";
import { WooCommerce } from "../../../lib/utils/woocommerce";


export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { searchWord } = req?.query ?? {};
  const { data } = await WooCommerce.get(`products?search=${searchWord}`);
  return res.status(200).json(data);
}
