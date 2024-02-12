import React, { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from 'next/router';
import CartLayout from "../src/components/cartLayout/CartLayout";
import { useGetCartData } from "../lib/coCart/getCart";
import { useGetCartTotals } from "../lib/coCart/getTotals";
import { BlockLayout, Breadcrumb, Spaces } from "@jstemplate/ecommerce-ui";
import { useShippingMethods } from 'lib/woocommerce/shippingMethods';
import { useCart } from "src/CartContext";

const Checkout = () => {
  const router = useRouter();

  // ==================Get all delivery methods  // Utiliser le hook useShippingMethods=================
  const { shippingMethods, isError } = useShippingMethods();
  // ==================Get all cart items data=================
  const { data: cartData } = useGetCartData();
  // ==================Get all cart items billing  data=================
  const { data: billingData } = useGetCartTotals();
  const { updateCart, cart, setSelectedShippingMethod, selectedShippingMethod } = useCart(); // Utiliser updateCart pour déclencher la mise à jour
  /* useEffect(() => {
     // Mettez ici la logique à exécuter lorsque les données du panier sont mises à jour
     console.log('Mise à jour des données du panier:', cartData);
     console.log('Mise à jour des données du cart:', cart);
   }, [cartData, cart]); // Ajoutez cart à la liste de dépendances pour surveiller les changements de cart*/
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
          <CartLayout cart={cart} selectedShippingMethod={selectedShippingMethod} setSelectedShippingMethod={setSelectedShippingMethod} updateCart cartData={cartData} billingData={billingData} shippingMethods={shippingMethods} />
        )}
      </BlockLayout>
      <Spaces />
    </>
  );
};

export default Checkout;
