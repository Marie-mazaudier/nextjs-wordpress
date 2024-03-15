import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useBacsMethods } from "lib/woocommerce/useBacsMethods";
import { BodyText } from "../../../../packages/ecommerce-ui/src";
//IMPORT DATA GRAPHQL
/*Menu*/
import { HocMenuData } from "lib/graphQL/menu/HocMenuData";
// Définition des interfaces pour typer les données de commande
interface BillingDetails {
    first_name: string;
    last_name: string;
    address_1: string;
    phone: string;
    email: string;

}

interface ShippingDetails {
    first_name: string;
    last_name: string;
    address_1: string;
}

interface LineItem {
    id: number;
    name: string;
    product_id: number;
    quantity: number;
    total: string;
}
interface ShippingLine {
    method_title: string;
    method_id: string
}
interface OrderDetails {
    id: number;
    billing: BillingDetails;
    shipping: ShippingDetails;
    line_items: LineItem[];
    total: string;
    status: string;
    payment_method: string;
    payment_method_title: string;
    payment_method_description: string;
    date_created: string;
    shipping_lines: ShippingLine[];
}
// Définition du type pour un objet de compte BACS
interface BacsAccount {
    account_name: string;
    account_number: string;
    bank_name: string;
    sort_code: string;
    iban: string;
    bic: string;
}
const OrderSummary = () => {
    const router = useRouter();
    const orderId = router.query.slug as string;

    const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { bacsInfo, bacsError } = useBacsMethods();

    useEffect(() => {
        console.log('BACS Info:', bacsInfo);
        if (bacsError) {
            console.error('Error fetching BACS info');
        }
    }, [bacsInfo, bacsError]);

    // Fonction pour récupérer les détails de la commande
    const fetchOrderDetails = async (id: string) => {
        try {
            const response = await axios.get(`/api/orders/${id}`);
            setOrderDetails(response.data);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching order details:", error);
            setError("Une erreur est survenue lors de la récupération des détails de la commande.");
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (router.isReady && orderId) {
            fetchOrderDetails(orderId);
        }
    }, [router.isReady, orderId]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!orderDetails) return <div>Aucune commande trouvée.</div>;

    let paymentMessage;
    if (orderDetails.status === 'completed') {
        paymentMessage = <div className="text-green-500">Votre paiement a été validé avec succès.</div>;

    } else if (orderDetails.status === 'on-hold' && orderDetails.payment_method === 'bacs') {
        paymentMessage = (
            <div>
                <div>Le statut du paiement est en attente de virement.</div>
                <BodyText size="md" className="text-themeSecondary800 mt-5 font-bold mb-8">
                    Effectuez le paiement directement depuis votre compte bancaire. <br></br>Veuillez utiliser
                    l’ID de votre commande comme référence du paiement. <br></br>Votre commande ne sera pas expédiée tant que les fonds ne seront pas reçus.
                </BodyText>
                {/* Affichez ici les détails bancaires BACS si disponibles */}
                {bacsInfo.map((account: BacsAccount, index: number) => (
                    <div key={index}>
                        <p>Nom du compte: {account.account_name}</p>
                        <p>Numéro de compte: {account.account_number}</p>
                        <p>Nom de la banque: {account.bank_name}</p>
                        <p>Code: {account.sort_code}</p>
                        <p>IBAN: {account.iban}</p>
                        <p>BIC: {account.bic}</p>
                    </div>
                ))}
            </div>
        );
    } else {
        // Vous pouvez ajuster ce message en fonction de la logique de votre application
        paymentMessage = <div>Le statut du paiement est en attente de confirmation.</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-xl font-semibold mb-4">Récapitulatif de la commande</h1>
            {paymentMessage}

            <div className="mb-8">
                <h2 className="text-lg font-semibold mb-2 mt-8">Détails de la commande</h2>
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Commande reçue</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">Merci. Votre commande a été reçue.</p>
                    </div>
                    {/* Affichage des articles commandés avec leur quantité et le total */}
                    <div >
                        <h2 className="text-lg font-semibold px-6 mb-2">Articles commandés</h2>
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Produit
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Quantité
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Total
                                    </th>
                                </tr>
                            </thead>

                            <tbody className=" bg-white divide-y mt-8 divide-gray-200">
                                {orderDetails.line_items.map((item) => (
                                    <tr key={item.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{item.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">{item.quantity}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">{item.total} €</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="border-t border-gray-200">
                        <dl>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Numéro de commande</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{orderDetails.id}</dd>
                            </div>
                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Date</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {
                                        new Date(orderDetails.date_created).toLocaleDateString('fr-CA', {
                                            year: 'numeric', month: 'long', day: 'numeric'
                                        })
                                    }
                                </dd>                            </div>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">E-mail</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{orderDetails.billing.email}</dd>
                            </div>
                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Total</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{orderDetails.total} €</dd>
                            </div>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Expédition</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {orderDetails.shipping_lines.map((line, index) => (
                                        <div key={index}>
                                            {line.method_id === 'local_pickup' && "Retrait sur place : récupérez votre produit en magasin muni de votre carte bancaire, accusé de réception et pièce d'identité."}
                                        </div>
                                    ))}
                                </dd>
                            </div>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Moyen de paiement</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{orderDetails.payment_method_title}</dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>

            <div className="mb-8">
                <h2 className="text-lg font-semibold mb-2">Adresse de facturation</h2>
                <address className="not-italic">
                    <p>{orderDetails.billing.first_name} {orderDetails.billing.last_name}</p>
                    <p>{orderDetails.billing.address_1}</p>
                    <p>{orderDetails.billing.phone}</p>
                    <p>{orderDetails.billing.email}</p>
                </address>
            </div>
        </div>
    );

};

export default OrderSummary;

export const getStaticProps = HocMenuData(async (context) => {
    return {
        props: {

        },
    }
})