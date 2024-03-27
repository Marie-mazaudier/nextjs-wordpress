// hooks/useWishlistShareKey.js
import useSWR from 'swr';
import { fetcher } from '../utils/fetcher.utils';

export const useWishlistShareKey = (userInfo: any) => {
    const shouldFetch = userInfo && userInfo.id;
    // console.log('shouldFetch', shouldFetch)
    const { data, error, isValidating } = useSWR(
        shouldFetch ? `/api/whishlist/view_whishlist?userID=${userInfo.id}` : null,
        fetcher
    );

    return {
        shareKey: data?.[0]?.share_key,
        isLoading: isValidating || !data,
        isError: error
    };
};