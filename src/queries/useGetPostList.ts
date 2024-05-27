import { useQuery } from '@tanstack/react-query';
import { getPostList } from '../api';

const useGetPostList = () => {
  const fetcher = async () => {
    const { data } = await getPostList();
    return data;
  };

  return useQuery({
    queryKey: ['getPostList'],
    queryFn: fetcher,
  });
};

export default useGetPostList;
