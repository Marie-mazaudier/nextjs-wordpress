import { NextApiRequest, NextApiResponse } from "next";
import { WooCommerce } from "../../../lib/utils/woocommerce";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { attributeId } = req.query;
  const { data } = await WooCommerce.get(`products/attributes/${attributeId}/terms`, {
    per_page: 10,
  });
  return res.status(200).json(data);
}
