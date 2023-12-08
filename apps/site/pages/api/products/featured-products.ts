import { NextApiRequest, NextApiResponse } from "next";
import { WooCommerce } from "../../../lib/utils/woocommerce";


export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { per_page } = req?.body;
  const queryInput = { per_page: per_page };
  const { data } = await WooCommerce.get(`products?featured=true`, queryInput || {});
  return res.status(200).json(data);
}
