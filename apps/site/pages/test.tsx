import useWishlist from "lib/woocommerce/useWishlist";
import WishlistItem from "src/components/wishlist/wishlistItem";
export interface WishlistItem {
    item_id: number;
    product_id: number;
    variation_id: number;
    meta: {
        "tinvwl-hidden-fields": string;
        "add-to-cart": number;
        "product_id": number;
        "quantity": number;
    };
    date_added: string;
    price: string;
    in_stock: boolean;
}
const WishlistComponent = (/*{ userId }*/) => {
    const { wishlist, loading, error } = useWishlist(/*userId*/);

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>Erreur : {error}</p>;

    return (
        <div>
            <h2>Ma liste de favoris</h2>
            {wishlist.length > 0 ? (
                <ul className=""> {/* Utilise divide-y pour ajouter une bordure horizontale entre les éléments de la liste */}
                    {wishlist.map((item: WishlistItem) => (
                        // Supposons que vous avez une fonction pour convertir product_id en slug ou que product_id fonctionne directement
                        <WishlistItem key={item.item_id} productId={item.product_id} />
                    ))}
                </ul>
            ) : (
                <p>Aucun favori trouvé.</p>
            )}
        </div>
    );
};

export default WishlistComponent;