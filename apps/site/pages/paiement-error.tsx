import React from "react";
import Link from "next/link";

const PaymentError = () => {
    return (
        <div className="container mx-auto p-4 text-center">
            <h1 className="text-xl font-semibold mb-4">Erreur de Paiement</h1>
            <p className="mb-8">Une erreur est survenue lors du traitement de votre paiement. Veuillez essayer à nouveau ou choisir une autre méthode de paiement.</p>
            <div className="flex justify-center gap-4">
                <Link href="/order-summary">
                    <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Retourner à la commande
                    </a>
                </Link>
                <Link href="/">
                    <a className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                        Retour à l'accueil
                    </a>
                </Link>
            </div>
        </div>
    );
};

export default PaymentError;
