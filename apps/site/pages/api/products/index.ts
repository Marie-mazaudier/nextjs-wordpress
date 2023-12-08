import { NextApiRequest, NextApiResponse } from "next";
import { WooCommerce } from "../../../lib/utils/woocommerce";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const query = req.query;
    const queryInput = {
      ...query,
      status: "publish",
    };
    const { data: Products, error: productsError } = await WooCommerce.get(`Products`, queryInput || {});
    if (productsError) {
      return res.status(500).json({ message: "Error retrieving products" });
    }
    res.status(200).json(Products);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving products" });
  }
};

//    const staticQuery = {
//      per_page: 10,
//    };
//    const finalQuery = query ? query : (staticQuery as any);
//    const queryStr =
//      Object.keys(finalQuery)
//        .map((key) => `${key}:${finalQuery[key]}`)
//        .join("&") || "";
