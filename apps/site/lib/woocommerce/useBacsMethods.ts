import useSWR from 'swr';
import { fetcher } from '../utils/fetcher.utils';

export const useBacsMethods = () => {

    const { data: bacsInfo, error } = useSWR('/api/payments/bacs', fetcher);

    return {
        bacsInfo: bacsInfo || null,
        bacsError: !!error
    };

}
