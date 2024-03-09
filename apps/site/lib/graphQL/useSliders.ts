import { useQuery } from '@apollo/client';
import { SLIDERS_QUERY } from 'src/data/graphQl/sliderQueries';

export const useSliders = () => {
    const { data, loading, error } = useQuery(SLIDERS_QUERY);
    return { data, loading, error };
};