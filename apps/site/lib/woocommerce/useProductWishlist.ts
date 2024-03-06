// hooks/useProductWishlist.ts
import useSWR from 'swr';
import { fetcher } from '../utils/fetcher.utils';

export const useProductWishlist = (identifier: string | number) => {
    // Construisez l'URL en fonction de l'identifiant fourni
    const endpoint = `/api/products/${identifier}`;

    // Utilisez useSWR pour récupérer les données du produit
    const { data: product, error, isValidating: isLoading } = useSWR(endpoint, fetcher);

    // Pas besoin de mapper les données puisque nous attendons un seul objet produit
    return {
        product, // Directement l'objet produit si l'API renvoie un objet unique
        productError: error,
        isLoading
    };
};