import { NextApiRequest, NextApiResponse } from "next";
import { WooCommerce } from "../../../lib/utils/woocommerce";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const slug = req.query.slug;
  const { data } = await WooCommerce.get("products", {
    slug: slug,
  });
  return res.status(200).json(data);
}
