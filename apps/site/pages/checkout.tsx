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
import { usePaymentMethods } from 'lib/woocommerce/paymentMethods';
import { useGetCartTotals } from "../lib/coCart/getTotals";
import { useCart } from "src/CartContext";
import { updateCartItemHandler, removeCartItemHandler } from "src/utils/cart.utils";
import createAlmaPayment from "lib/alma/createAlmaPayment";
import createPayPlugPayment from "lib/payplug/createPayPlugPayment";
import { checkEligibilityAlma } from "lib/alma/checkEligibilityAlma";
import validatePassword from "lib/woocommerce/passwordCheck";
import { useCreateUser } from "lib/woocommerce/user/useUser";
import SmallLoginForm from "src/components/loginRegistrationForm/SmallLoginForm";
import dynamic from "next/dynamic";
import SignupSignin from "src/components/signupSignin/SignupSignin";
import { useCoupons } from "lib/woocommerce/useCoupons";
//IMPORT DATA GRAPHQL
/*Menu*/
import { HocMenuData } from "lib/graphQL/menu/HocMenuData";
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
    payment_method_title: string,
    payment_method: string,
    billing: any;
    shipping: any;
    line_items: any[];
    shipping_lines?: ShippingLine[]; // Utilisation de ShippingLine au lieu de ShippingMethodInfoCheckout
    customer_id?: number;
    customer_ip_address: string
}
interface PaymentMethodDetails {
    id: string;
    title: string;
    description: string;
}
interface EligibilityResult {
    eligible: boolean;
    // Incluez d'autres champs selon la structure de la réponse d'Alma
}
interface AlmaEligibilityResponse {
    eligible: boolean;
    installments_count: number;
    payment_plan: {
        due_date: number;
        purchase_amount: number;
        customer_fee: number;
        customer_interest: number;
        total_amount: number;
        localized_due_date: string;
    }[];
}

const Checkout = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [selectedShippingMethodId, setSelectedShippingMethodId] = useState<string>('');
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState({ id: '', title: '', description: '' });
    const [isAlmaEligible, setIsAlmaEligible] = useState(false);
    const [almaEligibilityDetails, setAlmaEligibilityDetails] = useState<AlmaEligibilityResponse[]>([]);
    const [selectedInstallmentsCount, setSelectedInstallmentsCount] = useState<number | null>(null);
    const [customerId, setCustomerId] = useState<number | undefined>(0);
    const [customerIpAddress, setCustomerIpAddress] = useState("");
    const [loginModalOn, setLoginModalOn] = useState(false);

    const { addToast } = useToasts();

    //============Utiliser le hook useCreateUser=====================//
    const { createUser, loading: createUserLoading } = useCreateUser();
    // ==================Get all delivery methods  // Utiliser le hook useShippingMethods=================
    const { shippingMethods, isError } = useShippingMethods();
    // ==================Get all payment methods  // Utiliser le hook useShippingMethods=================
    const { paymentMethods, Error } = usePaymentMethods();
    // ==================Get all coupons  // Utiliser le hook coupons=================
    const { coupons, couponError } = useCoupons();
    // ==================Get all cart items data =================
    const { data: cartData } = useGetCartData();

    // ==================Get user data =================
    const { user, error, isLoading } = useUserDetails();
    // ==================Get all cart items billing  data=================
    const { data: billingData } = useGetCartTotals();
    // ==================Get cart data=================
    const { setSelectedShippingMethod, selectedShippingMethod, updateCart, updateDiscount, cart } = useCart();

    // console.log('billingData', billingData)
    // console.log('cartData', cartData)
    // console.log('methode de paiement', paymentMethods)
    //console.log("shippingMethods", shippingMethods)
    const cartSummaryData = {
        total: Number(cartData?.totals?.total) / 100,
        subtotal: Number(cartData?.totals?.subtotal) / 100,
        discount: Number(cart?.discount?.amount)
    };

    const lineItemsData = cartData?.items.map((item: any) => ({
        product_id: item.id,
        quantity: item.quantity.value,
    }));

    useEffect(() => {
        const cartTotal = Number(cart.subtotal) * 100;
        if (cartTotal > 0) {
            checkEligibilityAlma(cartTotal)
                .then(response => {
                    const eligible = response.some((result: EligibilityResult) => result.eligible);
                    setIsAlmaEligible(eligible);
                    // Mettre à jour l'état avec les détails d'éligibilité d'Alma
                    setAlmaEligibilityDetails(response);
                })
                .catch(error => {
                    console.error("Error checking eligibility:", error);
                    setIsAlmaEligible(false);
                });
        }
    }, [cart.subtotal]);

    // Fonction pour mettre à jour la méthode de paiement sélectionnées
    const handlePaymentMethodChange = (method: PaymentMethodDetails) => {
        //console.log('Updating selected payment method in Checkout:', method);
        setSelectedPaymentMethod(method);
    };
    //stocker le nombre d'échéances et définissez une fonction callback 
    const handleInstallmentsChange = (count: number) => {
        setSelectedInstallmentsCount(count);
    };
    useEffect(() => {
        setSelectedPaymentMethod(selectedPaymentMethod);
        console.log("payment_method: ", selectedPaymentMethod.id,
            "payment_method_title:", selectedPaymentMethod.title)

    }, [selectedPaymentMethod]);
    useEffect(() => {
        setSelectedShippingMethodId(selectedShippingMethod);
    }, [selectedShippingMethod]);
    // clic bouton commande
    useEffect(() => {
        // Récupération et mise à jour de l'adresse IP du client
        const fetchClientIp = async () => {
            try {
                const response = await axios.get("https://api.ipify.org?format=json");
                setCustomerIpAddress(response.data.ip);
            } catch (error) {
                console.error("Could not fetch client IP address:", error);
            }
        };

        fetchClientIp();
    }, []);
    const onSubmit = async (data: any, shippingData: any) => {
        setLoading(true);

        let shippingLines: ShippingLine[] | undefined; // Déclaration de shippingLines

        if (selectedShippingMethodId && shippingMethods.length > 0) {
            const selectedMethod = shippingMethods.find((method: ShippingMethodInfoCheckout) => method.method_id === selectedShippingMethodId);
            if (selectedMethod) {
                shippingLines = [{
                    method_title: selectedMethod.method_title,
                    method_id: selectedMethod.method_id,
                    total: (selectedMethod.method_id !== 'free_shipping' && selectedMethod.method_id !== 'local_pickup' && selectedMethod.title !== 'Retrait en magasin')
                        ? billingData.shipping_total : '0',
                }];
            }
        }

        //  console.log('orderData', orderData)
        const username = `${data.first_name.toLowerCase()}.${data.last_name.toLowerCase()}`;

        try {
            let localCustomerId = customerId; // Utilisez une variable locale pour gérer l'ID client

            if (!user) {
                const username = `${data.first_name.toLowerCase()}.${data.last_name.toLowerCase()}`;
                const userData = {
                    email: data.email,
                    first_name: data.first_name,
                    last_name: data.last_name,
                    username: username,
                    billing: data,
                    shipping: shippingData,
                    password: data.password
                    // Ajoutez d'autres données nécessaires pour créer un client
                };

                // Créer le nouvel utilisateur
                const response = await axios.post("/api/auth/register", userData);
                localCustomerId = response.data.id;

            } else {
                // Utiliser l'ID de l'utilisateur existant
                localCustomerId = user.id;
            }

            // Associer l'ID de l'utilisateur à la commande
            if (customerId) {
                localCustomerId = customerId;
            }
            const orderData: OrderData = {
                billing: data,
                shipping: shippingData, // Ici, shippingData sera soit identique à billingData, soit différent si l'utilisateur a spécifié une adresse de livraison différente
                line_items: lineItemsData,
                shipping_lines: shippingLines,
                payment_method: selectedPaymentMethod.id,
                payment_method_title: selectedPaymentMethod.title,
                customer_id: localCustomerId,
                customer_ip_address: customerIpAddress,
            };
            const response = await axios.post("/api/orders", orderData);
            setLoading(false);
            // console.log("Selected Payment Method ID:", selectedPaymentMethod.id);

            if (selectedPaymentMethod.id === "alma" && response?.data) {
                // Assurez-vous que response.data contient les informations nécessaires pour Alma
                console.log("response.data:", response.data);
                console.log("Preparing to create Alma payment");

                const almaResponse = await createAlmaPayment(response.data, selectedInstallmentsCount);
                if (almaResponse) {
                    addToast("Your Alma payment is initiated!", {
                        appearance: "success",
                        autoDismiss: true,
                        autoDismissTimeout: 2000
                    });
                    router.push(almaResponse.url || `/order-summary/${almaResponse.id}`);
                    return;
                }
            } else if (selectedPaymentMethod.id === "payplug" && response?.data) {
                console.log("response.data:", response.data);
                console.log("Preparing to create Payplug payment");
                const payPlugResponse = await createPayPlugPayment(response.data);
                console.log("payPlugResponse:", payPlugResponse);

                if (payPlugResponse) {
                    // Traitez la réponse de PayPlug, comme la redirection vers l'URL de paiement
                    addToast("Your Payplug payment is initiated!", {
                        appearance: "success",
                        autoDismiss: true,
                        autoDismissTimeout: 2000
                    });
                    router.push(payPlugResponse.hosted_payment.payment_url)
                    //window.location.href = payPlugResponse.hosted_payment_url;
                    return;
                }
            } else if (response?.data) {
                addToast("Your order is complete!", {
                    appearance: "success",
                    autoDismiss: true,
                    autoDismissTimeout: 2000
                });
                router.push(`/order-summary/${response.data.id}`);
            }
        } catch (error: any) {
            setLoading(false);
            let errorMessage = "An error occurred while processing your order";

            // Vérifier si l'erreur est due à un nom d'utilisateur existant
            if (error.response && error.response.data && error.response.data.code === "user") {
                errorMessage = "Un utilisateur existe déjà avec cet email. Connecter vous ou essayer avec un autre email.";
            }

            // Afficher le message d'erreur dans la notification toast
            addToast(errorMessage, {
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
                        updateDiscount={updateDiscount}
                        paymentMethods={paymentMethods}
                        coupons={coupons}
                        onPaymentMethodChange={handlePaymentMethodChange}
                        isAlmaEligible={isAlmaEligible}
                        almaEligibilityDetails={almaEligibilityDetails}
                        onInstallmentsChange={handleInstallmentsChange}
                        validatePassword={validatePassword}
                        setLoginModalOn={setLoginModalOn} // Ajoutez ceci pour passer la fonction au composant enfant
                        cart={cart}
                    />
                    {loginModalOn && <SignupSignin setLoginModalOn={setLoginModalOn} LoginmodalOn={loginModalOn} />}

                </>
            )}
        </div>
    );
};

export default Checkout;


export const getStaticProps = HocMenuData(async (context) => {
    return {
        props: {

        },
    }
})