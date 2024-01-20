import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from 'next/router';
import CartLayout from "../src/components/cartLayout/CartLayout";
import { useGetCartData } from "../lib/coCart/getCart";
import { useGetCartTotals } from "../lib/coCart/getTotals";
import { BlockLayout, Breadcrumb, Spaces } from "@jstemplate/ecommerce-ui";

const Checkout = () => {
  const router = useRouter();

  // ==================Get all cart items data=================
  const { data: cartData } = useGetCartData();
  // ==================Get all cart items billing  data=================
  const { data: billingData } = useGetCartTotals();
  return (
    <>
      <Head>
        <title>Cart page | MetaShop</title>
        <meta name="description" content="Cart page description" />
      </Head>
      <Breadcrumb />
      <Spaces size="mdd" />
      <BlockLayout>
        {cartData?.items?.length === 0 ? (
          <div className="grid justify-center">
            <p className="text-base sm:text-2xl font-semibold text-themePrimary600 py-10 text-center">
              There are no items in your cart yet.
            </p>
            <Link href="/shop/shop-left-sidebar">
              <button className="flex justify-center mx-auto text-sm sm:text-base font-medium cursor-pointer mt-10 px-4 sm:px-6 py-3 sm:py-4 rounded-md bg-themePrimary600 text-white hover:opacity-70 transition duration-300 ease-in-out">
                Back to Shop
              </button>
            </Link>
          </div>
        ) : (
          <CartLayout cartData={cartData} billingData={billingData} />
        )}
      </BlockLayout>
      <Spaces />
    </>
  );
};

export default Checkout;
