import { useProductWithRelationsQuery } from '../generated/graphql';
import { useGetIntId } from './useGetIntId';

const useGetProductFromUrl = () => {
  const id = useGetIntId();

  return useProductWithRelationsQuery({
    skip: id === -1,
    variables: {
      id,
    },
  });
};

export default useGetProductFromUrl;
