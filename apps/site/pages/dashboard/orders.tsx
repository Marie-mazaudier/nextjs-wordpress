import { useUserDetails } from "lib/woocommerce/user/useUserDetails";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { BlockLayout, Spaces, DashBoard } from "@jstemplate/ecommerce-ui";
import { sidebarMenu } from "../../src/data/SidebarMenu";
import dynamic from "next/dynamic";
import generatePDF from "src/components/invoice/generatePDF";
//IMPORT DATA GRAPHQL
/*Menu*/
import { HocMenuData } from "lib/graphQL/menu/HocMenuData";

const DashboardSideBar = dynamic(() => import("../../src/components/DashboardSideBar/DashboardSideBar"), {
    ssr: false,
});
// Interfaces pour typer les données de la commande
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
    phone: string;
    email: string;
}

interface LineItem {
    id: number;
    name: string;
    quantity: number;
    total: string;
}

interface ShippingLine {
    method_title: string;
    method_id: string;
}

interface MetaData {
    id: number;
    key: string;
    value: any; // 'value' peut être de type 'any' car il peut contenir différentes structures de données
}

interface Order {
    id: number;
    date_created: string;
    status: string;
    total: string;
    billing: BillingDetails;
    shipping: ShippingDetails;
    line_items: LineItem[];
    payment_method: string;
    payment_method_title: string;
    meta_data?: MetaData[];
    shipping_lines: ShippingLine[];
    shipping_total: number;


}

interface OrdersPageState {
    orders: Order[];
    loading: boolean;
    error: string | null;
}
const Orders = () => {
    const { user, error: userError, isLoading: userLoading } = useUserDetails();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (user && user.id) {
            setLoading(true);
            axios
                .get(`/api/orders?customer=${user.id}`)
                .then((response) => {
                    setOrders(response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    setError("Erreur lors de la récupération des commandes.");
                    setLoading(false);
                });
        }
    }, [user]);

    if (userLoading) {
        return <p>Chargement des détails de l'utilisateur...</p>;
    }

    if (userError || error) {
        return <p>Erreur lors de la récupération des données.</p>;
    }
    console.log('order', orders)

    return (
        <>
            <Spaces size="sm" />
            <BlockLayout>
                <div className="lg:flex items-start gap-10 space-y-10 lg:space-y-0">
                    <DashboardSideBar sidebarMenu={sidebarMenu} userData={user} />
                    <div className="grow">
                        <h2 className="text-xl font-semibold mb-4">Mes Commandes</h2>
                        {loading ? (
                            <p>Chargement des commandes...</p>
                        ) : (
                            <table className="min-w-full table-auto">
                                <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                    <tr>
                                        <th className="py-3 px-6 text-left">ID de commande</th>
                                        <th className="py-3 px-6 text-left">Date</th>
                                        <th className="py-3 px-6 text-left">Statut</th>
                                        <th className="py-3 px-6 text-left">Total</th>
                                        <th className="py-3 px-6 text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600 text-sm font-light">
                                    {orders.map((order) => {
                                        // Création d'un nouvel objet Date à partir de la chaîne de date de la commande
                                        const date = new Date(order.date_created);

                                        // Formatage de la date
                                        const formattedDate = date.toLocaleDateString('fr-FR', {
                                            year: 'numeric', // Année numérique
                                            month: 'long', // Mois en toutes lettres
                                            day: '2-digit' // Jour avec deux chiffres
                                        });

                                        return (
                                            <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-100">
                                                <td className="py-3 px-6 text-left whitespace-nowrap">{order.id}</td>
                                                <td className="py-3 px-6 text-left">{formattedDate}</td> {/* Utilisation de la date formatée ici */}
                                                <td className="py-3 px-6 text-left">{order.status}</td>
                                                <td className="py-3 px-6 text-left">{order.total}</td>
                                                <td className="py-3 px-0 text-center">
                                                    <div className="flex item-center justify-around">
                                                        <Link legacyBehavior href={`/dashboard/order/${order.id}`}>
                                                            <a className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                                                <button className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                                                                    Voir
                                                                </button>
                                                            </a>
                                                        </Link>
                                                        {/* Bouton Facture si vous avez une page ou un fichier pour cela */}
                                                        <button
                                                            className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                            type="button"
                                                            onClick={() => {
                                                                // Supposons que `order` est déjà l'objet complet attendu par `generatePDF`
                                                                // Si ce n'est pas le cas, vous devez récupérer les informations manquantes ici
                                                                generatePDF(order);
                                                            }}
                                                        >
                                                            Facture
                                                        </button>

                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </BlockLayout>
            <Spaces />
        </>
    );

};

export default Orders;


export const getStaticProps = HocMenuData(async (context) => {
    return {
        props: {

        },
    }
})