import { NextApiRequest, NextApiResponse } from "next";
import { WooCommerce } from "../../../lib/utils/woocommerce";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {categoryId, ...query} = req.query;
    const queryInput = {
      ...query,
      status: "publish",
    };
    const { data: Products, error: productsError } = await WooCommerce.get(`products?category=${categoryId}`,queryInput || {});
    if (productsError) {
      return res.status(500).json({ message: "Error retrieving products" });
    }
    res.status(200).json(Products);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving products" });
  }
};
