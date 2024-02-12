import useSWR from 'swr';
import { fetcher } from '../utils/fetcher.utils';

/**
 * Hook pour obtenir les méthodes de livraison
 * @param zone Id as a params
 * @returns | { shippingMethods: [], isError: boolean }
 */
export const useShippingMethods = () => {

    const { data: shippingMethods, error } = useSWR('/api/shippings/shipping_methods', fetcher);

    return {
        shippingMethods: shippingMethods || [],
        isError: !!error
    };
};