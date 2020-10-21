import { useBrandQuery, useCategoryQuery } from '../generated/graphql';
import { useGetIntId } from './useGetIntId';

const useGetCategoryFromUrl = () => {
  const id = useGetIntId();

  return useCategoryQuery({
    skip: id === -1,
    variables: {
      id,
    },
  });
};

export default useGetCategoryFromUrl;
