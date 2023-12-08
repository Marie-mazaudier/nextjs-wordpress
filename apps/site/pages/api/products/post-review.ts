import { NextApiRequest, NextApiResponse } from "next";
import { WooCommerce } from "../../../lib/utils/woocommerce";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { product_id, review, reviewer, reviewer_email, rating } = req?.body;
  const { data } = await WooCommerce.post("products/reviews", {
    product_id,
    review,
    reviewer,
    reviewer_email,
    rating,
  });
  return res.status(200).json(data);
}
