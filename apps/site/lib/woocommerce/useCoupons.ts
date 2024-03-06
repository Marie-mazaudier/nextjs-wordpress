import useSWR from 'swr';
import { fetcher } from '../utils/fetcher.utils';

/**
 * Hook pour obtenir les méthodes de livraison
 * @returns | { paymentMethods: [], Error: boolean }
 */
export const useCoupons = () => {

    const { data: coupons, error } = useSWR('/api/discount/coupons', fetcher);
    return {
        coupons: coupons || [],
        couponError: !!error
    };
}; 