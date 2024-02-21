import useSWR from 'swr';
import { fetcher } from '../utils/fetcher.utils';

/**
 * Hook pour obtenir les méthodes de livraison
 * @returns | { paymentMethods: [], Error: boolean }
 */
export const usePaymentMethods = () => {

    const { data: paymentMethods, error } = useSWR('/api/payments/payment_methods', fetcher);
    return {
        paymentMethods: paymentMethods || [],
        Error: !!error
    };
}; 