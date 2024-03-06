import { useQuery } from '@apollo/client';
import { POPUPS_QUERY } from './popupsQueries';

export const usePopups = () => {
    const { data, loading, error } = useQuery(POPUPS_QUERY);
    return { data, loading, error };
};