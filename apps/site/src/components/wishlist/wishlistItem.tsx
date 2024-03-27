import { useProductWishlist } from "lib/woocommerce/useProductWishlist";
import useDeleteWishlistItem from "lib/woocommerce/useDeleteWishlistItem";


import Link from "next/link";
interface WishlistItemProps {
    productId: number; // Typage explicite du productId comme un nombre
    item_id: number;
    userInfo: any;
    shareKey: string;
}

const wishlistItem: React.FC<WishlistItemProps> = ({ productId, item_id, userInfo, shareKey }) => {
    // Utilisez useProduct ici pour récupérer les détails du produit
    const { product, productError, isLoading } = useProductWishlist(productId); // Convertissez productId en string si nécessaire
    const deleteWishlistItem = useDeleteWishlistItem();

    //console.log(product)
    if (isLoading) return <p>Chargement des détails du produit...</p>;
    if (productError) return <p>Erreur lors de la récupération des détails du produit.</p>;
    if (!product || product.length === 0) return <p>Produit introuvable.</p>;

    // Accès à la première image du tableau pour l'image mise en avant
    const imageUrl = product.images && product.images.length > 0 ? product.images[0].src : '';
    const handleDelete = () => {
        if (shareKey) {
            deleteWishlistItem(item_id, shareKey); // Passez shareKey à deleteWishlistItem
        }
    };
    return (
        <div className="my-2 flex items-center"> {/* Ajoute un espacement vertical externe pour chaque élément */}
            <li className="flex items-center space-x-4"> {/* Utilise flex pour disposer les éléments horizontalement */}
                <Link href={`/shop/product/${product.slug}`} className="flex items-center space-x-4">
                    <img src={imageUrl} alt={product.name} className="w-24 h-auto shadow-lg rounded" /> {/* Image du produit */}
                    <div className="flex flex-col"> {/* Conteneur pour le nom du produit */}
                        <h3 className="text-lg font-semibold">{product.name}</h3>
                    </div>
                    <div className="flex flex-col"> {/* Conteneur pour le prix du produit */}
                        <p className="text-sm font-medium text-gray-600">{product.price} €</p>
                    </div>
                </Link>
            </li>
            <button onClick={handleDelete} className="ml-auto"> {/* Ajoutez ml-auto pour aligner à droite */}
                <svg className="w-6 h-6 text-red-500 hover:text-red-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            <hr className="mt-2 border-t border-gray-200" /> {/* Ligne de séparation sous chaque élément */}
        </div>


    );
};

export default wishlistItem;