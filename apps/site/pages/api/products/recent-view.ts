import { NextApiRequest, NextApiResponse } from "next";
import { WooCommerce } from "../../../lib/utils/woocommerce";
import { getCookie } from "cookies-next";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  // only accept GET requests
  if (req.method !== "GET") {
    return res.status(400).json({
      message: "You are not allowed",
    });
  }
  const {page } = req.query;
  const reviewedData = getCookie("recently_viewed_data_list", { req, res }) as any;
  const productId = JSON.parse(reviewedData);
  const show_items = page ? page : 10;
  const { data } = await WooCommerce.get("products", {
    include: productId,
    per_page: show_items,
  });
  return res.status(200).json(data);
}
