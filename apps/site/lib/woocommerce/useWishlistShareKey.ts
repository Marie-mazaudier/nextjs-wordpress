// hooks/useWishlistShareKey.js
import useSWR from 'swr';
import { fetcher } from '../utils/fetcher.utils';
import { useUserDetails } from './user/useUserDetails';

export const useWishlistShareKey = () => {
    const { user } = useUserDetails();

    const { data, error, isValidating } = useSWR(() => user?.id ? `/api/whishlist/view_whishlist?userID=${user.id}` : null, fetcher);

    //console.log('Wishlist Data:', data); // Pour débogage
    // console.log('Wishlist Error:', error); // Pour débogage
    // console.log('data?.share_key', data?.[0]?.share_key)
    return {
        shareKey: data?.[0]?.share_key, // Accès au premier élément du tableau pour obtenir share_key
        isLoading: isValidating || !data,
        isError: error
    };
};