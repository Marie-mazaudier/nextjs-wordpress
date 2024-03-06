// hooks/useDeleteWishlistItem.js
import { mutate } from 'swr';

const useDeleteWishlistItem = () => {
    const deleteWishlistItem = async (item_id: number, shareKey: string) => {
        try {
            await fetch(`/api/whishlist/delete_wishlist?item_id=${item_id}`);
            // Utilisez le shareKey pour construire l'URL de revalidation
            mutate(`/api/whishlist/view_products?share_key=${shareKey}`); // Revalider la liste de la wishlist
        } catch (error) {
            console.error("Erreur lors de la suppression de l'article :", error);
        }
    };

    return deleteWishlistItem;
};

export default useDeleteWishlistItem;
