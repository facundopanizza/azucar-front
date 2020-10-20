import { useBrandQuery } from '../generated/graphql';
import { useGetIntId } from './useGetIntId';

const useGetBrandFromUrl = () => {
  const id = useGetIntId();

  return useBrandQuery({
    skip: id === -1,
    variables: {
      id,
    },
  });
};

export default useGetBrandFromUrl;
