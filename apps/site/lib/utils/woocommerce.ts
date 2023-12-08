import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

export const WooCommerce = new WooCommerceRestApi({
  url: `${process.env.NEXT_PUBLIC_API_URL}`,
  consumerKey: `${process.env.WOOCOMMERCE_CONSUMER_KEY}`,
  consumerSecret: `${process.env.WOOCOMMERCE_CONSUMER_SECRET}`,
  version: "wc/v3",
  queryStringAuth: true,
});
