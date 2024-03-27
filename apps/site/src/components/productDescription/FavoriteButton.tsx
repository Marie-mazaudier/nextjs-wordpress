import React, { useState } from "react";
import { RiHeart2Line, RiHeart2Fill } from "react-icons/ri";
import { Button } from "../../../../../packages/ecommerce-ui/src";
const { toast } = require('react-toastify');

interface ProductInWishlist {
    product_id: string;
    item_id: number;
}

interface FavoriteButtonProps {
    productId: string;
    wishlistProducts?: ProductInWishlist[];
    isUserLoggedIn: boolean;
    setLoginModalOn: (isOpen: boolean) => void;
    deleteWishlistItem: (itemId: number, shareKey: string) => Promise<void>;
    addProductToWishlist: (shareKey: string, productId: string) => Promise<void>;
    shareKey?: string;
    revalidate: () => void; // Ajouter la définition de type pour revalidat
}
const FavoriteButton = ({
    productId,
    wishlistProducts,
    isUserLoggedIn,
    setLoginModalOn,
    deleteWishlistItem,
    addProductToWishlist,
    shareKey,
    revalidate
}: FavoriteButtonProps) => {
    const [justAddedToFavorites, setJustAddedToFavorites] = useState(false);

    const isProductInWishlist = wishlistProducts?.some(
        (wishlistProduct) => wishlistProduct.product_id === productId
    );
    const handleAddToWishlistClick = async () => {

        if (shareKey) {
            try {
                await addProductToWishlist(shareKey, productId);
                toast("Produit ajouté aux favoris", { type: "success" });
                setJustAddedToFavorites(true);
                revalidate(); // Appeler la fonction de revalidation ici
            } catch (error) {
                console.error("Error adding product to wishlist:", error);
            }
        }
    };

    const handleDeleteToWishlistClick = () => {
        if (shareKey) {
            const itemToDeleteId = wishlistProducts?.find(
                (item: any) => item.product_id === productId
            )?.item_id;
            console.log('itemToDeleteId', itemToDeleteId)
            if (itemToDeleteId) {
                deleteWishlistItem(itemToDeleteId, shareKey);
                setJustAddedToFavorites(false);
                revalidate(); // Appeler la fonction de revalidation ici
                toast("Produit retiré des favoris", { type: "success" });
            } else {
                console.warn("Item not found in wishlist:", shareKey);
            }
        }
    };
    // console.log('isUserLoggedIn', isUserLoggedIn)

    return (
        <div className="wishlist-icon absolute bottom-0 right-0">
            {isUserLoggedIn ? (
                (isProductInWishlist || justAddedToFavorites) ? (
                    // Icône cœur plein pour les produits en favoris
                    <button onClick={handleDeleteToWishlistClick}>
                        <RiHeart2Fill />
                    </button>
                ) : (
                    // Icône cœur vide pour ajouter aux favoris
                    <button onClick={handleAddToWishlistClick}>
                        <RiHeart2Line />
                    </button>
                )
            ) : (
                // Bouton pour se connecter si l'utilisateur n'est pas connecté
                <button onClick={() => setLoginModalOn(true)}>
                    <RiHeart2Line />
                </button>
            )}
        </div>
    );
};

export default FavoriteButton;
