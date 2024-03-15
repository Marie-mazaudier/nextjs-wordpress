import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useBacsMethods } from "lib/woocommerce/useBacsMethods";
import { BodyText } from "../../../../../packages/ecommerce-ui/src";
import { BlockLayout, Spaces, DashBoard } from "@jstemplate/ecommerce-ui";
import { sidebarMenu } from "../../../src/data/SidebarMenu";
import dynamic from "next/dynamic";
import { useUserDetails } from "lib/woocommerce/user/useUserDetails";
//IMPORT DATA GRAPHQL
/*Menu*/
import { HocMenuData } from "lib/graphQL/menu/HocMenuData";
const DashboardSideBar = dynamic(() => import("../../../src/components/DashboardSideBar/DashboardSideBar"), {
    ssr: false,
});
// Définition des interfaces pour typer les données de commande
interface BillingDetails {
    first_name: string;
    last_name: string;
    address_1: string;
    phone: string;
    email: string;
    postcode: number;
    country: string;
    city: string;
}

interface ShippingDetails {
    first_name: string;
    last_name: string;
    address_1: string;
    postcode: number;
    country: string;
    city: string;
    phone: string;
    email: string;
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
const ViewOrder = () => {
    const router = useRouter();
    const { orderId } = router.query; // Assurez-vous que le nom du paramètre correspond à celui défini dans le fichier de route
    const { user, error: userError, isLoading: userLoading } = useUserDetails();
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

    useEffect(() => {
        if (orderId) {
            setIsLoading(true);
            axios.get(`/api/orders/${orderId}`)
                .then(response => {
                    setOrderDetails(response.data);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error("Error fetching order details:", error);
                    setError("Une erreur est survenue lors de la récupération des détails de la commande.");
                    setIsLoading(false);
                });
        }
    }, [orderId]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!orderDetails) return <div>Aucune commande trouvée.</div>;

    let orderMessage;
    if (orderDetails.status === 'completed') {
        orderMessage = <div className="text-green-500"> terminée</div>;

    } else if (orderDetails.status === 'on-hold' && orderDetails.payment_method === 'bacs') {
        orderMessage = (
            <>
                <strong>en attente de virement</strong>

                {/* Affichez ici les détails bancaires BACS si disponibles */}
                {bacsInfo?.map((account: BacsAccount, index: number) => (
                    <div key={index} className="container mx-auto p-4">
                        <h2 className="text-lg font-semibold mt-8 mb-2">Informations de compte</h2>
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Détail</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valeur</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap">Nom du compte</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{account.account_name}</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap">Nom de la banque</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{account.bank_name}</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap">IBAN</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{account.iban}</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap">BIC</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{account.bic}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                ))}
            </>
        );
    } else if (orderDetails.status === 'processing') {
        // Vous pouvez ajuster ce message en fonction de la logique de votre application
        orderMessage = <strong>en cours</strong>;
    } else if (orderDetails.status === 'cancelled') {
        // Vous pouvez ajuster ce message en fonction de la logique de votre application
        orderMessage = <strong>annulée</strong>;
    } else if (orderDetails.status === 'failed') {
        // Vous pouvez ajuster ce message en fonction de la logique de votre application
        orderMessage = <strong>échouée</strong>;
    } else if (orderDetails.status === 'refunded') {
        // Vous pouvez ajuster ce message en fonction de la logique de votre application
        orderMessage = <strong>remboursée</strong>;
    } else if (orderDetails.status === 'pending') {
        // Vous pouvez ajuster ce message en fonction de la logique de votre application
        orderMessage = <strong>en attente de confirmation de paiement</strong>;
    }
    console.log('détails', orderDetails)
    return (
        <>
            <Spaces size="sm" />
            <BlockLayout>
                <div className="lg:flex items-start gap-10 space-y-10 lg:space-y-0">
                    <DashboardSideBar sidebarMenu={sidebarMenu} userData={user} />
                    <div className="container mx-auto p-4">
                        <div className="mb-8">
                            <p>La commande <strong>{orderDetails.id}</strong> a été passée le
                                <strong> {
                                    ' ' + new Date(orderDetails.date_created).toLocaleDateString('fr-CA', {
                                        year: 'numeric', month: 'long', day: 'numeric'
                                    })
                                } </strong> et est actuellement {orderMessage}.</p>
                            <h1 className="text-lg font-semibold mb-8 mt-8">Détails de la commande</h1>
                            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                                {/* Affichage des articles commandés avec leur quantité et le total */}
                                <div >
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead>
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Produit
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
                                                                <div className="text-sm font-medium text-gray-900">{item.name} x {item.quantity}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">{item.total} €</td>
                                                </tr>
                                            ))}
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">Expédition</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-normal text-right text-sm text-gray-500 break-words max-w-xs">
                                                    {orderDetails.shipping_lines.map((line, index) => (
                                                        <div key={index}>
                                                            {line.method_id === 'local_pickup' && "Retrait sur place : récupérez votre produit en magasin muni de votre carte bancaire, accusé de réception et pièce d'identité."}
                                                        </div>
                                                    ))}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">Moyen de paiement</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">{orderDetails.payment_method_title}</td>
                                            </tr>
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">Total</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500"> {orderDetails.total}€</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between space-x-4 mb-8">
                            <div className="flex-1">
                                <h2 className="text-lg font-semibold mb-2">Adresse de facturation</h2>
                                <address className="not-italic">
                                    <p>{orderDetails.billing.first_name} {orderDetails.billing.last_name}</p>
                                    <p>{orderDetails.billing.address_1}</p>
                                    <p>{orderDetails.billing.postcode} {orderDetails.billing.city}, {orderDetails.billing.country}</p>
                                    <p>{orderDetails.billing.phone}</p>
                                    <p>{orderDetails.billing.email}</p>
                                </address>
                            </div>

                            <div className="flex-1">
                                <h2 className="text-lg font-semibold mb-2">Adresse de Livraison</h2>
                                <address className="not-italic">
                                    <p>{orderDetails.shipping.first_name} {orderDetails.shipping.last_name}</p>
                                    <p>{orderDetails.shipping.address_1}</p>
                                    <p>{orderDetails.shipping.postcode} {orderDetails.shipping.city}, {orderDetails.shipping.country}</p>
                                    <p>{orderDetails.shipping.phone}</p>
                                    <p>{orderDetails.shipping.email}</p>
                                </address>
                            </div>
                        </div>

                    </div>
                </div>
            </BlockLayout>
        </>
    );

};

export default ViewOrder;


export const getStaticProps = HocMenuData(async (context) => {
    return {
        props: {

        },
    }
})