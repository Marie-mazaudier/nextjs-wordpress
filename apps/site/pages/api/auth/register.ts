import { NextApiRequest, NextApiResponse } from "next";
import { WooCommerce } from "../../../lib/utils/woocommerce";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  // only accept POST requests
  if (req.method !== "POST") {
    return res.status(400).json({
      message: "You are not allowed",
    });
  }

  if (req.method === "POST") {
    const { data } = await WooCommerce.post(`customers`, req.body);
    return res.status(200).json(data);
  }
}
