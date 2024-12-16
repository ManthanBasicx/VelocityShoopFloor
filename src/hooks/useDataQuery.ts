import { useQuery } from '@tanstack/react-query';
import { fetchData } from '../utils/api';

export const useDataQuery = () => {
  return useQuery({
    queryKey: ['data'],
    queryFn: fetchData,
  });
};