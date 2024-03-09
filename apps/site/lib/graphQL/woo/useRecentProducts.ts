import { useQuery } from '@apollo/client';
import { GET_RECENT_JEWELRY_QUERY, GET_RECENT_WATCHES_QUERY } from 'src/data/graphQl/woo/products/recentProducts';

// Hook pour récupérer les bijoux d'occasion récents
export function useRecentJewelry() {
    const { loading: loadingJewelry, error: errorJewelry, data: dataJewelry } = useQuery(GET_RECENT_JEWELRY_QUERY);

    return {
        loadingJewelry,
        errorJewelry,
        jewelry: dataJewelry?.products.nodes || [],
    };
}

// Hook pour récupérer les montres d'occasion récentes
export function useRecentWatches() {
    const { loading: loadingWatches, error: errorWatches, data: dataWatches } = useQuery(GET_RECENT_WATCHES_QUERY);

    return {
        loadingWatches,
        errorWatches,
        watches: dataWatches?.products.nodes || [],
    };
}
