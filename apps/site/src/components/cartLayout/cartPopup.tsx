import React, { useEffect, useState, useRef } from "react";
import { useCart } from "src/CartContext";
import Link from "next/link";
import { useRouter } from "next/router"; // Importez le gestionnaire de routage
import { removeCartItemHandler } from "src/utils/cart.utils";
import { RxCross2 } from "react-icons/rx";
import { AiOutlineLoading3Quarters } from "react-icons/ai"; // Icone de chargement

interface CartPopupProps {
    onClose: () => void;
}

const CartPopup: React.FC<CartPopupProps> = ({ onClose }) => {
    const { cart, updateCart } = useCart();
    const router = useRouter(); // Utilisez le gestionnaire de routage
    const popupRef = useRef<HTMLDivElement | null>(null); // Spécifiez le type HTMLDivElement
    const [itemRemoveLoading, setItemRemoveLoading] = React.useState(false);
    const [removingItemId, setRemovingItemId] = useState<string | null>(null);

    //Gestion suppression du panier
    const onRemoveCartItem = async (itemKey: string) => {
        await removeCartItemHandler(itemKey, setItemRemoveLoading);
        updateCart; // Assurez-vous que cette fonction rafraîchit les données du panier depuis le serveur
    };

    // Fonction modifiée pour gérer la suppression avec un état par article
    const handleRemoveCartItem = async (itemKey: string) => {
        setRemovingItemId(itemKey); // Indiquez quel article est en cours de suppression
        await onRemoveCartItem(itemKey);
        setRemovingItemId(null); // Réinitialisez après suppression
    };


    const [popupClass, setPopupClass] = useState("slide-in");

    // Fonction pour fermer la popup avec animation de fermeture
    const closePopup = () => {
        setPopupClass("slide-out");
        setTimeout(() => {
            onClose();
        }, 300);
    };


    // Gestionnaire d'événement pour détecter les clics sur le document
    const handleClickOutside = (event: MouseEvent) => {
        if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
            closePopup();
        }
    };

    // Ajoutez un écouteur d'événement pour les clics sur le document
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Nettoyez l'écouteur d'événement lorsque le composant est démonté
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);



    return (
        <div ref={popupRef} className={`bg-white p-4 w-[400px] rounded-xl z-[99999] shadow-lg fixed top-0 right-0 h-screen overflow-y-auto ${popupClass} cart-popup`}>            <div className="flex justify-between mb-4">
            <h2 className="text-2xl font-semibold">Votre Panier</h2>
            <button
                onClick={closePopup} // Utilisez closePopup au lieu de onClose
                className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
                <span className="sr-only">Fermer le menu</span>
                <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>
        </div>
            {cart.items.length === 0 ? (
                <p className="text-center text-gray-500">Votre panier est vide</p>
            ) : (
                <>
                    <ul>
                        {cart.items.map((item) => (
                            <li key={item.id} className="mb-2 flex justify-between items-center">
                                <div className="flex-initial w-auto flex items-center">
                                    <div onClick={() => handleRemoveCartItem(item.item_key)}>
                                        {removingItemId === item.item_key ? (
                                            <AiOutlineLoading3Quarters className="animate-spin" />
                                        ) : (
                                            <RxCross2 className="w-5 h-5 cursor-pointer" />
                                        )}
                                    </div>
                                    <img src={item.featured_image} alt={item.name} className="w-12 h-12 mr-2" />
                                    <Link href={`/produit/${item.slug}`}>
                                        <p className="text-themeSecondary800 line-clamp-1">
                                            {item.name}
                                        </p>
                                    </Link>
                                </div>
                                <span className="text-[#283747] leading-7">
                                    {item.quantity.value} x {(item.price / 100).toFixed(2)} €
                                </span>
                            </li>
                        ))}
                    </ul>
                    <div className="border-t border-gray-300 mt-4 pt-4">
                        <p className="font-semibold">Sous-total: {cart.subtotal} €</p>
                    </div>
                    <div className="mt-4 flex justify-between">
                        <Link href="/cart">
                            <button
                                onClick={() => {
                                    closePopup(); // Fermer la popup avant la navigation
                                    router.push("/cart"); // Naviguer vers la page "Panier"
                                }}
                                className="bg-themePrimary600 text-white py-2 px-4 rounded-full hover:bg-themePrimary700 transition hover:duration-300"
                            >
                                Voir le Panier
                            </button>
                        </Link>
                        <Link href="/checkout">
                            <button
                                onClick={() => {
                                    closePopup(); // Fermer la popup avant la navigation
                                    router.push("/checkout"); // Naviguer vers la page "Panier"
                                }}
                                className="bg-themePrimary600 text-white py-2 px-4 rounded-full hover:bg-themePrimary700 transition hover:duration-300">
                                Commander
                            </button>
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartPopup;
