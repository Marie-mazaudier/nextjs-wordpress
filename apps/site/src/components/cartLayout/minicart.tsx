import { BodyText, Button, SocialShare } from "@jstemplate/ecommerce-ui";
import Link from "next/link";
import React, { useEffect } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import Skeleton from "react-loading-skeleton";
import { addBuyNowHandler, addToCartHandler } from "../../utils/cart.utils";
import { useToasts } from "react-toast-notifications";
import { useRouter } from "next/router";
import { LoaderRound } from "../../loaders/Loader";
import { useCart } from "../../CartContext";
import { useGetCartData } from '../../../lib/coCart/getCart';

interface MiniCartProps {
    data?: any;
    id?: any
    onStockOut?: () => void; // Ajout de la nouvelle prop optionnelle
    isOutOfStock?: boolean; // Ajouté ici
    isInCart?: boolean;
    handleIsInCart?: () => void;
}

const MiniCart = ({ data, id, onStockOut, isOutOfStock, isInCart, handleIsInCart }: MiniCartProps) => {
    //==========filter product color attributes============
    // const colorAttribute = data?.attributes.find((attribute: any) => attribute.name.toLowerCase() === "color");
    const { updateCart, updateStock, cart } = useCart(); // Récupération de updateStock depuis le contexte
    // ==================Get all cart items data=================
    const { data: cartData } = useGetCartData();

    const [itemValue, setItemValue] = React.useState("");
    const [count, setCount] = React.useState(1);
    const [loading, setLoading] = React.useState(false);
    //  const [buyLoading, setbuyLoading] = React.useState(false);
    const [maxQuantity, setMaxQuantity] = React.useState(data?.stock_quantity);

    const router = useRouter();
    const { addToast } = useToasts();

    const productToast = (message: string, type: any) => {
        addToast(`${message}`, {
            appearance: type,
            autoDismiss: true,
        });
    };

    // const stockOut = data?.stockStatus === "OUT_OF_STOCK";
    useEffect(() => {
        // S'assurer que `data` est défini avant de continuer
        if (data && cart.items) {
            const productInCart = cart.items.find(item => item.id === id);
            if (productInCart) {
                // Si le produit est déjà dans le panier, ajustez la quantité disponible
                const availableQuantity = data.stock_quantity - productInCart.quantity.value;
                setMaxQuantity(availableQuantity);

            } else {
                // Si le produit n'est pas dans le panier, utilisez la quantité de stock initial
                setMaxQuantity(data.stock_quantity);
            }
        }
    }, [cart.items, data]);

    // Mettez à jour votre logique onClick pour le bouton "Ajouter au panier"
    const handleAddToCart = async () => {
        const result = await addToCartHandler(data, itemValue, setLoading, count, updateCart, updateStock, productToast);
        // console.log('result', result)
        if (!result.success && result.code === "OUT_OF_STOCK") {
            if (onStockOut) onStockOut(); // Vérifiez que onStockOut est défini avant de l'appeler

        } else if (!result.success && result.code === "STOCK_INSUFFISANT") {
            if (handleIsInCart) handleIsInCart()
        }
    };

    return (
        <div>
            {/* Conditionally render COLOR section only if colorAttribute exists and has options */}
            <div className="flex flex-col md:flex-row md:items-center justify-center gap-7 mt-5">
                <div className="flex items-center gap-3">
                    {data ? (
                        !isOutOfStock && !isInCart ? ( // Utilisez isOutOfStock pour la condition
                            <button onClick={handleAddToCart}
                                type="submit"
                                className={`font-medium text-base px-5 rounded-sm py-[5px] leading-6 text-white transition bg-principal hover:duration-500 flex justify-center`}
                            >
                                {loading && <LoaderRound />}
                                <span className={`${loading ? "ml-2" : ""}`}>
                                    {loading ? "Veuillez patienter..." : "Ajouter au panier"}
                                </span>
                            </button>
                        ) : (
                            <Link href={`/produit/${data.slug}`}>
                                <button className="font-medium text-base px-5 rounded-sm py-[5px] leading-6 text-white bg-principal hover:bg-themeSecondary800 transition flex justify-center">
                                    Lire la suite
                                </button>
                            </Link>
                        )
                    ) : (
                        <Skeleton height={52} width={147} borderRadius={50} />
                    )}
                </div>
            </div>

        </div>
    );
};

export default MiniCart;