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
import { ServicePointPicker } from "src/components/delivery/ServicePointPicker";
import { useFetchShippingMethods } from "lib/woocommerce/shippingUtils";


interface InitialShippingMethod {
    id: number;
    // Ajoutez d'autres propriétés si nécessaire selon la réponse de l'API
}

interface ShippingMethodInfo {
    id: number;
    name: string;
    price: number;
    // Ajoutez d'autres propriétés si nécessaire
}
interface ShippingMethod {
    id: number;
    name: string;
    min_weight?: string;
    max_weight?: string;
    price: number; // Assurez-vous que cette propriété est présente et obligatoire
    countries?: {
        id: number;
        name: string;
        price: number;
        iso_2: string;
        iso_3: string;
    }[];
};
// Définition des types
interface ShippingLine {
    method_id?: string;
    method_title: string;
    total?: string;
    meta_data?: Array<{
        key: string;
        value: string;
    }>;
}
interface OrderData {
    billing: any; // Remplacez 'any' par un type approprié
    shipping: any; // Remplacez 'any' par un type approprié
    line_items: any[]; // Remplacez 'any' par un type approprié
    shipping_lines?: ShippingLine[];
}
interface ParcelData {
    to_service_point?: number; // Ajout de l'ID du point relais
    name: string;
    company_name: string;
    address: string;
    house_number: string;
    city: string;
    postal_code: string;
    telephone: string;
    request_label: boolean;
    email: string;
    data: object;
    country: string;
    shipment: {
        id: number;
    };
    weight: string;
    order_number: string;
    insured_value: number;
    total_order_value_currency: string;
    total_order_value: string;
    quantity: number;
    shipping_method_checkout_name: string;
}

const Checkout = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { addToast } = useToasts();
    const { data: cartData } = useGetCartData();
    const { user, error, isLoading } = useUserDetails();
    const cartSummaryData = {
        total: Number(cartData?.totals?.total) / 100,
        subtotal: Number(cartData?.totals?.subtotal) / 100,
        discount: Number(cartData?.totals?.discount_total)
    };
    const {
        shippingMethodsInfo,
        selectedShippingMethod,
        setSelectedShippingMethod,
        selectedShippingMethodValue,
        setSelectedShippingMethodValue,
        selectedServicePointId,
        handleServicePointSelected,
        totalWithShipping, // Utiliser le total incluant les frais de livraison
    } = useFetchShippingMethods(cartData, cartSummaryData);
    // Exemple de valeurs dynamiques récupérées depuis le formulaire
    const pays = 'FR'; // ou une valeur dynamique
    const postalCode = '31000'; // ou une valeur dynamique
    const city = 'Toulouse'; // ou une valeur dynamique
    //
    const publicKey = `${process.env.NEXT_PUBLIC_SEND_CLOUD_PUBLIC_KEY}`
    const lineItemsData = cartData?.items.map((item: any) => ({
        product_id: item.id,
        quantity: item.quantity.value,
    }));
    // Générer un numéro de commande unique
    const orderNumber = `ORDER-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    // Dans le composant Checkout
    useEffect(() => {
        const getMethodId = (methodParam: string | string[]): number | null => {
            if (Array.isArray(methodParam)) {
                return parseInt(methodParam[0], 10);
            } else if (typeof methodParam === 'string') {
                return parseInt(methodParam, 10);
            }
            return null;
        };

        const methodId = getMethodId(router.query.shippingMethod as string | string[]);

        if (methodId === -1) {
            // Cas spécifique du "Retrait en point de vente"
            setSelectedShippingMethodValue("-1");
        } else if (methodId !== null && shippingMethodsInfo.length > 0) {
            const selectedMethod = shippingMethodsInfo.find(m => m.id === methodId);
            if (selectedMethod) {
                setSelectedShippingMethod(selectedMethod);
                setSelectedShippingMethodValue(selectedMethod.id.toString());
            }
        }
    }, [router.query, shippingMethodsInfo]);





    // clic bouton commande
    const onSubmit = async (formData: any) => {
        setLoading(true);

        // Construction des données de base pour la commande
        let orderData: OrderData = {
            billing: formData,
            shipping: formData,
            line_items: lineItemsData,
            // shipping_lines sera ajouté plus tard
        };
        // Si l'option de retrait en point de vente est sélectionnée
        if (selectedShippingMethodValue === "-1") {
            orderData.shipping_lines = [{
                method_id: "point_de_vente",
                method_title: "Retrait en point de vente",
            }];

            console.log(orderData.shipping_lines)
            try {
                const orderResponse = await axios.post("/api/orders", orderData);
                if (orderResponse?.data) {
                    addToast("Votre commande est complète !", {
                        appearance: "success",
                        autoDismiss: true,
                        autoDismissTimeout: 2000
                    });
                    router.push("/");
                }
            } catch (error) {
                console.error('Erreur:', error);
            } finally {
                setLoading(false);
            }
        } else {
            // Traitement pour les méthodes de livraison SendCloud
            let parcelData: ParcelData = {
                name: formData.first_name + " " + formData.last_name,
                company_name: formData.company || 'NS',
                address: formData.address_1,
                house_number: formData.houseNumber || '',
                city: formData.city,
                postal_code: formData.postcode,
                telephone: formData.phone,
                request_label: true,
                email: formData.email,
                data: {},
                country: formData.pays || 'FR',
                shipment: {
                    id: selectedShippingMethod?.id || 8
                },
                weight: (parseFloat(cartData?.items_weight.toString()).toFixed(2)),
                order_number: orderNumber,
                insured_value: 0,
                total_order_value_currency: "EUR",
                total_order_value: cartSummaryData.total.toString(),
                quantity: 1,
                shipping_method_checkout_name: selectedShippingMethod?.name || "Chrono 18"
            };

            // Si "Chrono Relais" est sélectionné et que l'ID du point relais est défini
            if (selectedShippingMethod?.name.includes("Chrono Relais") && selectedServicePointId) {
                // Convertir l'ID du point relais en nombre
                const servicePointIdNumber = parseInt(selectedServicePointId, 10);
                console.log(servicePointIdNumber)
                if (!isNaN(servicePointIdNumber)) {
                    parcelData.to_service_point = servicePointIdNumber;
                } else {
                    console.error("ID du point relais invalide");
                    setLoading(false);
                    return;
                }
            } else if (selectedShippingMethod?.name.includes("Chrono Relais") && !selectedServicePointId) {
                // Gérer le cas où le point relais n'est pas sélectionné alors que c'est nécessaire
                console.error("Point relais non sélectionné pour la méthode Chrono Relais");
                setLoading(false);
                return;
            }

            try {
                // Exécutez la première requête pour créer le colis
                const parcelResponse = await fetch('/api/sendcloud/sendcloud', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ parcel: parcelData })
                });
                const parcelDataResponse = await parcelResponse.json();

                if (!parcelResponse.ok) {
                    throw new Error(parcelDataResponse.message || 'Erreur lors de la création du colis.');
                }

                // Si le colis est créé avec succès, continuez avec la soumission de la commande
                // Générer l'URL de téléchargement du label en utilisant la variable d'environnement
                const labelDownloadUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/test?labelId=${parcelDataResponse.parcel.id}`;
                // Construisez shippingLinesData ici
                const shippingLinesData: ShippingLine[] = selectedShippingMethod ? [{
                    method_id: selectedShippingMethod.id.toString(),
                    method_title: "Chronopost ou Valeur Déclarée",
                    total: selectedShippingMethod.price.toFixed(2),
                    meta_data: [{
                        key: 'Imprimer l\'étiquette Chronopost',
                        value: labelDownloadUrl // Mettez ici l'URL appropriée
                    }]
                }] : [];

                // Ajoutez shippingLinesData à orderData
                orderData.shipping_lines = shippingLinesData;



                const orderResponse = await axios.post("/api/orders", orderData);
                if (orderResponse?.data) {
                    addToast("Your order is complete!", {
                        appearance: "success",
                        autoDismiss: true,
                        autoDismissTimeout: 2000
                    });
                    router.push("/");
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
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
                        shippingMethodsInfo={shippingMethodsInfo}
                        selectedShippingMethod={selectedShippingMethod}
                        setSelectedShippingMethod={setSelectedShippingMethod}
                        selectedShippingMethodValue={selectedShippingMethodValue}
                        setSelectedShippingMethodValue={setSelectedShippingMethodValue}
                        ServicePointPicker={ServicePointPicker}
                        totalWithShipping={totalWithShipping} // Passer totalWithShipping comme prop
                        publicKey={publicKey}
                        pays={pays}
                        postalCode={postalCode}
                        city={city}
                        handleServicePointSelected={handleServicePointSelected} />


                </>
            )}
        </div>
    );
};

export default Checkout;
