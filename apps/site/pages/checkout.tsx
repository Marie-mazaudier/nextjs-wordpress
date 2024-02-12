import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { useToasts } from "react-toast-notifications";
import { useGetCartData } from "../lib/coCart/getCart";
import { useUserDetails } from "../lib/woocommerce/user/useUserDetails";
import { Breadcrumb } from "@jstemplate/ecommerce-ui";
import { Loader } from "../src/components/formLoader/FormLoader";
import { CheckOut } from "@jstemplate/checkout-flow";
import { useShippingMethods } from 'lib/woocommerce/shippingMethods';
import { useGetCartTotals } from "../lib/coCart/getTotals";
import { useCart } from "src/CartContext";
import { updateCartItemHandler, removeCartItemHandler } from "src/utils/cart.utils";

interface ShippingMethodInfoCheckout {
    id: number;
    method_id: string;
    method_title: string;
    method_description: string;
}

interface ShippingLine {
    //   id: number;
    method_title: string;
    method_id: string;
    total: string;
    // description: string;
}

interface OrderData {
    billing: any;
    shipping: any;
    line_items: any[];
    shipping_lines?: ShippingLine[]; // Utilisation de ShippingLine au lieu de ShippingMethodInfoCheckout
}

const Checkout = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [selectedShippingMethodId, setSelectedShippingMethodId] = useState<string>('');
    const { setSelectedShippingMethod, selectedShippingMethod, updateCart } = useCart();

    const { addToast } = useToasts();

    // ==================Get all delivery methods  // Utiliser le hook useShippingMethods=================
    const { shippingMethods, isError } = useShippingMethods();
    // ==================Get all cart items data =================
    const { data: cartData } = useGetCartData();

    // ==================Get user data =================
    const { user, error, isLoading } = useUserDetails();
    // ==================Get all cart items billing  data=================
    const { data: billingData } = useGetCartTotals();
    // console.log('billingData', billingData)
    console.log('cartData', cartData)

    const cartSummaryData = {
        total: Number(cartData?.totals?.total) / 100,
        subtotal: Number(cartData?.totals?.subtotal) / 100,
        discount: Number(cartData?.totals?.discount_total)
    };

    const lineItemsData = cartData?.items.map((item: any) => ({
        product_id: item.id,
        quantity: item.quantity.value,
    }));

    // Ajout d'un effet pour définir la méthode de livraison par défaut
    /* useEffect(() => {
         const defaultMethod = shippingMethods.find((method: ShippingMethodInfoCheckout) =>
             method.method_id !== 'free_shipping' && method.method_id !== 'local_pickup'
         );
         if (defaultMethod) {
             setSelectedShippingMethodId(defaultMethod.method_id);
         }
     }, [shippingMethods]);*/
    // Mettre à jour l'état local en fonction du contexte
    useEffect(() => {
        setSelectedShippingMethodId(selectedShippingMethod);
    }, [selectedShippingMethod]);
    // clic bouton commande
    // console.log('selectedShippingMethodId', selectedShippingMethodId)
    const onSubmit = async (data: any) => {
        setLoading(true);

        let shippingLines: ShippingLine[] | undefined; // Déclaration de shippingLines

        if (selectedShippingMethodId && shippingMethods.length > 0) {
            const selectedMethod = shippingMethods.find((method: ShippingMethodInfoCheckout) => method.method_id === selectedShippingMethodId);
            if (selectedMethod) {
                shippingLines = [{
                    method_title: selectedMethod.method_title,
                    method_id: selectedMethod.method_id,
                    total: (selectedMethod.method_id !== 'free_shipping' && selectedMethod.method_id !== 'local_pickup')
                        ? billingData.shipping_total : '0',
                }];
            }
        }

        const orderData: OrderData = {
            billing: data,
            shipping: data,
            line_items: lineItemsData,
            shipping_lines: shippingLines // Attribution correcte
        };
        // console.log('orderData', orderData)
        try {
            const response = await axios.post("/api/orders", orderData);
            setLoading(false)
            if (response?.data) {
                addToast("Your order is complete!", {
                    appearance: "success",
                    autoDismiss: true,
                    autoDismissTimeout: 2000
                })
                router.push("/");
            }
        } catch (error: any) {
            setLoading(false);
            addToast("An error occurred while processing your order", {
                appearance: "error",
                autoDismiss: true,
            });
        }
    };

    return (
        <div className="bg-themeSecondary100 pb-14 md:pb-20 lg:pb-24">
            <Head>
                <title>Checkout page | MetaShop</title>
                <meta name="description" content="Checkout page description" />
            </Head>
            <Breadcrumb />

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
                <>
                    <CheckOut
                        loading={loading}
                        formSubmit={onSubmit}
                        summeryData={cartSummaryData}
                        cartData={cartData?.items}
                        autoFill
                        userData={user?.billing}
                        userLogin={user?.billing}
                        shippingMethods={shippingMethods}
                        billingData={billingData}
                        onShippingMethodSelected={setSelectedShippingMethodId}
                        selectedShippingMethod={selectedShippingMethod}
                        setSelectedShippingMethod={setSelectedShippingMethod}
                        updateCartItemHandler={updateCartItemHandler}
                        removeCartItemHandler={removeCartItemHandler}
                        updateCart={updateCart}
                    />


                </>
            )}
        </div>
    );
};

export default Checkout;
