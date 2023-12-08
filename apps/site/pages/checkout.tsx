import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios"
import { useToasts } from "react-toast-notifications";
import { useGetCartData } from "../lib/coCart/getCart";
import { useUserDetails } from "../lib/woocommerce/user/useUserDetails";
import { Breadcrumb } from "@jstemplate/ecommerce-ui";
import { Loader } from "../src/components/formLoader/FormLoader";
import { CheckOut } from "@jstemplate/checkout-flow";

const Checkout = () => {
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const { addToast } = useToasts();

    // ==================Get all cart items data =================
    const { data: cartData } = useGetCartData();

    // ==================Get user data =================
    const { user, error, isLoading } = useUserDetails();

    const cartSummaryData = {
        total: Number(cartData?.totals?.total) / 100,
        subtotal: Number(cartData?.totals?.subtotal) / 100,
        discount: Number(cartData?.totals?.discount_total)
    }

    const lineItemsData = cartData?.items.map((item: any) => {
        return {
            product_id: item.id,
            quantity: item.quantity.value
        }
    })

    // submit the wp order 
    const onSubmit = async (data: any) => {
        setLoading(true)
        const orderData = {
            billing: data,
            shipping: data,
            line_items: lineItemsData
        };
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
            setLoading(false)
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
                <CheckOut
                    loading={loading}
                    formSubmit={onSubmit}
                    summeryData={cartSummaryData}
                    cartData={cartData?.items}
                    autoFill
                    userData={user?.billing}
                    userLogin={user?.billing}
                />
            )}
        </div>
    );
};

export default Checkout;
