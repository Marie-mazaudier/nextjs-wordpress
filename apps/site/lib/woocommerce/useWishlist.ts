// hooks/useWishlist.js
import useSWR from 'swr';
import { fetcher } from '../utils/fetcher.utils';
import { useUserDetails } from './user/useUserDetails';
import { mutate } from 'swr';
const useWishlist = () => {
    const { user } = useUserDetails();

    // Utilisez SWR pour obtenir la clé de partage de la liste de souhaits
    const {
        data: wishlistKeyData,
        error: wishlistKeyError,
        isValidating: loadingWishlistKey
    } = useSWR(user?.id ? `/api/whishlist/view_whishlist?userID=${user.id}` : null, fetcher, { revalidateOnFocus: false });

    const shareKey = wishlistKeyData?.[0]?.share_key;

    // Utilisez SWR pour obtenir les produits de la liste de souhaits en utilisant le share_key
    const {
        data: wishlistProducts,
        error: wishlistProductsError,
        isValidating: loadingWishlistProducts
    } = useSWR(shareKey ? `/api/whishlist/view_products?share_key=${shareKey}` : null, fetcher, { revalidateOnFocus: false });

    // Gérez l'état de chargement global pour la récupération des clés de la liste de souhaits et des produits
    const loading = loadingWishlistKey || loadingWishlistProducts;

    // Combinez les erreurs pour une gestion simplifiée des erreurs
    const error = wishlistKeyError || wishlistProductsError;

    // Simplifiez la réponse pour les consommateurs du hook
    return {
        wishlistProducts, // Directement les produits de la liste de souhaits
        loading, // État de chargement global
        error, // Erreur globale
        shareKey, // Clé de partage pour des utilisations ultérieures
        // Fonction de revalidation pour permettre aux consommateurs du hook de forcer une mise à jour des données
        revalidate: () => {
            // Utilisez mutate de SWR pour revalider les deux requêtes
            // Notez que cette méthode ne déclenche pas immédiatement la revalidation, mais marque les données pour une revalidation
            mutate(`/api/whishlist/view_whishlist?userID=${user.id}`);
            if (shareKey) {
                mutate(`/api/whishlist/view_products?share_key=${shareKey}`);
            }
        },
    };
};

export default useWishlist;
