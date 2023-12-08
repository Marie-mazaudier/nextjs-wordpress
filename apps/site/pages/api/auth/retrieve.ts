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
  const userInfo = getCookie("__user__login__info", { req, res }) as any;
  const user = JSON.parse(userInfo);
  const id = user?.id;
  const { data } = await WooCommerce.get(`customers/${id}`);
  return res.status(200).json(data);
}
