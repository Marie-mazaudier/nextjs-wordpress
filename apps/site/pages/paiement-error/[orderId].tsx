import React, { useEffect } from "react";
import Link from "next/link";
import updateOrderStatus from "lib/woocommerce/paymentFailed";
import { useRouter } from 'next/router';
//IMPORT DATA GRAPHQL
/*Menu*/
import { HocMenuData } from "lib/graphQL/menu/HocMenuData";
interface PaymentErrorProps {
    orderId: string; // Assurez-vous que cela correspond à la manière dont vous passez orderId à ce composant
}


const PaymentError = () => {
    const router = useRouter();
    // Assurez-vous que orderId est une chaîne de caractères. Si c'est un tableau, prenez le premier élément.
    const orderId = Array.isArray(router.query.orderId) ? router.query.orderId[0] : router.query.orderId;
    console.log('orderId', orderId)
    useEffect(() => {
        // Vérifiez si orderId est présent et est une chaîne
        if (typeof orderId === 'string') {
            updateOrderStatus(orderId, 'failed')
                .then(() => console.log("Statut de la commande mis à jour avec succès"))
                .catch((error) => console.error("Erreur lors de la mise à jour du statut de la commande:", error));
        }
    }, [orderId]);

    return (
        <div className=" gap-4 text-center mb-8">
            <h1 className="text-xl font-semibold mb-4">Erreur de Paiement</h1>
            <p className="mb-8">Une erreur est survenue lors du traitement de votre paiement. Veuillez essayer à nouveau ou choisir une autre méthode de paiement.</p>
            <div className="flex justify-center gap-4">
                <Link href="/checkout" legacyBehavior>
                    <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Retourner à la commande
                    </a>
                </Link>
                <Link href="/" legacyBehavior>
                    <a className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                        Retour à l'accueil
                    </a>
                </Link>
            </div>
        </div>
    );
};

export default PaymentError;

export const getStaticProps = HocMenuData(async (context) => {
    return {
        props: {

        },
    }
})