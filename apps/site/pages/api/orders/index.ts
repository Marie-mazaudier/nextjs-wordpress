import { NextApiRequest, NextApiResponse } from "next";
import { deleteCookie } from "cookies-next";
import { WooCommerce } from "../../../lib/utils/woocommerce";

export default async function (req: NextApiRequest, res: NextApiResponse) {

  const { billing, shipping, line_items, shipping_lines } = req.body;

  WooCommerce.post('orders', {
    payment_method: 'cod',
    payment_method_title: 'Cash On Delivery',
    set_paid: true,
    billing: billing,
    shipping: shipping,
    line_items: line_items,
    shipping_lines: shipping_lines
  })
    .then((response) => {
      if (response?.data) {
        deleteCookie('cart_key', { req, res });
      }
      res.status(200).json(response.data);
    })
    .catch((error) => {
      res.status(400).json({ error: error.response });
    });
}

