import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";

// Définition des interfaces pour typer les données de commande
interface BillingDetails {
    first_name: string;
    last_name: string;
    address_1: string;
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

interface OrderDetails {
    id: number;
    billing: BillingDetails;
    shipping: ShippingDetails;
    line_items: LineItem[];
    total: string;
}

const OrderSummary = () => {
    const router = useRouter();
    // Utilisation de router.isReady pour s'assurer que les données de route sont disponibles
    const orderId = router.query.slug as string;
    const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
    const [isLoading, setIsLoading] = useState(false); // État de chargement
    const [error, setError] = useState<string | null>(null); // État d'erreur
    const [paymentStatus, setPaymentStatus] = useState<string>('pending');
    useEffect(() => {
        // console.log(router.query); // Log pour voir tous les query params
        // console.log(router.isReady); // Vérifie si le router est prêt
        if (router.isReady) {
            //   console.log('Router is ready:', router.query);
            // Définition de la fonction asynchrone pour récupérer les détails de la commande
            const fetchOrderDetails = async (id: string) => {
                setIsLoading(true); // Début du chargement
                try {
                    const response = await axios.get(`/api/orders/${id}`);
                    setOrderDetails(response.data);
                } catch (error) {
                    console.error("Error fetching order details:", error);
                    setError("Une erreur est survenue lors de la récupération des détails de la commande."); // Mise à jour de l'état d'erreur
                } finally {
                    setIsLoading(false); // Fin du chargement
                }
            };

            if (orderId) {
                // console.log('Order ID ok:', orderId);
                fetchOrderDetails(orderId);

            }
        }
    }, [router.isReady, router.query, orderId]);

    //Mise à jour information de paiement si validé
    // Gestion de la validation du paiement si 'pid' est présent dans l'URL
    useEffect(() => {
        const validatePayment = async (paymentId: string) => {
            try {
                const response = await axios.get(`/api/payments/validate-payment?pid=${paymentId}`);
                if (response.data && response.data.message === "Payment validated and order updated successfully") {
                    setPaymentStatus('success');
                } else {
                    setPaymentStatus('failure');
                    console.log(response.data + response.data.message, 'response.data')
                }
            } catch (error) {
                console.error("Error during payment validation:", error);
                setPaymentStatus('failure');
            }
        };

        if (router.query.pid) {
            validatePayment(router.query.pid as string);
        }
    }, [router.query.pid]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!orderDetails) return <div>Aucune commande trouvée.</div>;

    // Gestion de l'affichage basé sur le statut de paiement
    let paymentMessage;
    switch (paymentStatus) {
        case 'success':
            paymentMessage = <div className="text-green-500">Votre paiement a été validé avec succès.</div>;
            break;
        case 'failure':
            paymentMessage = <div className="text-red-500">Le paiement a échoué. Veuillez essayer à nouveau.</div>;
            break;
        default:
            paymentMessage = <div>Le statut du paiement est en attente de confirmation.</div>;
            break;
    }

    // Gestion des états de chargement et d'erreur
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!orderDetails) return <div>Aucune commande trouvée.</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-xl font-semibold mb-4">Récapitulatif de la commande</h1>
            {paymentMessage}

            <div className="mb-8">
                <h2 className="text-lg font-semibold mb-2">Détails de la commande</h2>
                <p>Numéro de commande: {orderDetails.id}</p>
                <p>Total de la commande: {orderDetails.total} €</p>
            </div>

            <div className="mb-8">
                <h2 className="text-lg font-semibold mb-2">Adresse de facturation</h2>
                <p>{orderDetails.billing.first_name} {orderDetails.billing.last_name}</p>
                <p>{orderDetails.billing.address_1}</p>
            </div>

            <div className="mb-8">
                <h2 className="text-lg font-semibold mb-2">Adresse de livraison</h2>
                <p>{orderDetails.shipping.first_name} {orderDetails.shipping.last_name}</p>
                <p>{orderDetails.shipping.address_1}</p>
            </div>

            <div>
                <h2 className="text-lg font-semibold mb-2">Articles commandés</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 text-left font-medium text-gray-500">Produit</th>
                                <th className="px-4 py-2 text-right font-medium text-gray-500">Quantité</th>
                                <th className="px-4 py-2 text-right font-medium text-gray-500">Total</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {orderDetails.line_items.map((item) => (
                                <tr key={item.id}>
                                    <td className="px-4 py-2">{item.name}</td>
                                    <td className="px-4 py-2 text-right">{item.quantity}</td>
                                    <td className="px-4 py-2 text-right">{item.total} €</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;
