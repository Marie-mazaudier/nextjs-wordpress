import { NextApiRequest, NextApiResponse } from "next";
import { WooCommerce } from "../../../lib/utils/woocommerce";



export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { id } = req?.query;
  const { data } = await WooCommerce.get(`products/reviews?product=${id}`);
  return res.status(200).json(data);
}
