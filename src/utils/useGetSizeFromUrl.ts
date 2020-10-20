import { useSizeQuery } from '../generated/graphql';
import { useGetIntId } from './useGetIntId';

const useGetSizeFromUrl = () => {
  const id = useGetIntId();

  return useSizeQuery({
    skip: id === -1,
    variables: {
      id,
    },
  });
};

export default useGetSizeFromUrl;
