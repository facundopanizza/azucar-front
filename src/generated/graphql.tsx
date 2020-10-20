import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  brands: Array<Brand>;
  brand?: Maybe<Brand>;
  sizes: Array<Size>;
  size?: Maybe<Size>;
  products: Array<Product>;
  product?: Maybe<Product>;
  prices: Array<Price>;
  price?: Maybe<Price>;
};


export type QueryBrandArgs = {
  id: Scalars['Int'];
};


export type QuerySizeArgs = {
  id: Scalars['Int'];
};


export type QueryProductsArgs = {
  brandId?: Maybe<Scalars['Int']>;
  term?: Maybe<Scalars['String']>;
};


export type QueryProductArgs = {
  id: Scalars['Int'];
};


export type QueryPriceArgs = {
  id: Scalars['Int'];
};

export type Brand = {
  __typename?: 'Brand';
  id: Scalars['Float'];
  title: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Size = {
  __typename?: 'Size';
  id: Scalars['Float'];
  title: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Product = {
  __typename?: 'Product';
  id: Scalars['Float'];
  title: Scalars['String'];
  brandCode: Scalars['String'];
  brand: Brand;
  prices: Array<Price>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Price = {
  __typename?: 'Price';
  id: Scalars['Float'];
  amount: Scalars['Float'];
  size: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBrand: BrandResponse;
  editBrand: BrandResponse;
  deleteBrand: Scalars['Boolean'];
  createSize: SizeResponse;
  editSize: SizeResponse;
  deleteSize: Scalars['Boolean'];
  createProduct: ProductResponse;
  editProduct: ProductResponse;
  deleteProduct: Scalars['Boolean'];
  createPrice: PriceResponse;
  editPrice: PriceResponse;
  deletePrice: Scalars['Boolean'];
};


export type MutationCreateBrandArgs = {
  title: Scalars['String'];
};


export type MutationEditBrandArgs = {
  title: Scalars['String'];
  id: Scalars['Int'];
};


export type MutationDeleteBrandArgs = {
  id: Scalars['Int'];
};


export type MutationCreateSizeArgs = {
  title: Scalars['String'];
};


export type MutationEditSizeArgs = {
  title: Scalars['String'];
  id: Scalars['Int'];
};


export type MutationDeleteSizeArgs = {
  id: Scalars['Int'];
};


export type MutationCreateProductArgs = {
  brandId: Scalars['Int'];
  brandCode: Scalars['String'];
  title: Scalars['String'];
};


export type MutationEditProductArgs = {
  brandId: Scalars['Int'];
  brandCode: Scalars['String'];
  title: Scalars['String'];
  id: Scalars['Int'];
};


export type MutationDeleteProductArgs = {
  id: Scalars['Int'];
};


export type MutationCreatePriceArgs = {
  productId: Scalars['Int'];
  size: Scalars['String'];
  amount: Scalars['Float'];
};


export type MutationEditPriceArgs = {
  size: Scalars['String'];
  amount: Scalars['Float'];
  id: Scalars['Int'];
};


export type MutationDeletePriceArgs = {
  id: Scalars['Int'];
};

export type BrandResponse = {
  __typename?: 'BrandResponse';
  errors?: Maybe<Array<FieldError>>;
  brand?: Maybe<Brand>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type SizeResponse = {
  __typename?: 'SizeResponse';
  errors?: Maybe<Array<FieldError>>;
  size?: Maybe<Size>;
};

export type ProductResponse = {
  __typename?: 'ProductResponse';
  errors?: Maybe<Array<FieldError>>;
  product?: Maybe<Product>;
};

export type PriceResponse = {
  __typename?: 'PriceResponse';
  errors?: Maybe<Array<FieldError>>;
  price?: Maybe<Price>;
};

export type CreatePriceMutationVariables = Exact<{
  productId: Scalars['Int'];
  size: Scalars['String'];
  amount: Scalars['Float'];
}>;


export type CreatePriceMutation = (
  { __typename?: 'Mutation' }
  & { createPrice: (
    { __typename?: 'PriceResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, price?: Maybe<(
      { __typename?: 'Price' }
      & Pick<Price, 'id' | 'amount' | 'size' | 'createdAt' | 'updatedAt'>
    )> }
  ) }
);

export type DeletePriceMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeletePriceMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deletePrice'>
);

export type BrandsQueryVariables = Exact<{ [key: string]: never; }>;


export type BrandsQuery = (
  { __typename?: 'Query' }
  & { brands: Array<(
    { __typename?: 'Brand' }
    & Pick<Brand, 'id' | 'title'>
  )> }
);

export type CreateBrandMutationVariables = Exact<{
  title: Scalars['String'];
}>;


export type CreateBrandMutation = (
  { __typename?: 'Mutation' }
  & { createBrand: (
    { __typename?: 'BrandResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, brand?: Maybe<(
      { __typename?: 'Brand' }
      & Pick<Brand, 'id' | 'title' | 'createdAt' | 'updatedAt'>
    )> }
  ) }
);

export type CreateProductMutationVariables = Exact<{
  brandId: Scalars['Int'];
  brandCode: Scalars['String'];
  title: Scalars['String'];
}>;


export type CreateProductMutation = (
  { __typename?: 'Mutation' }
  & { createProduct: (
    { __typename?: 'ProductResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, product?: Maybe<(
      { __typename?: 'Product' }
      & Pick<Product, 'id' | 'title' | 'brandCode' | 'createdAt' | 'updatedAt'>
    )> }
  ) }
);

export type CreateSizeMutationVariables = Exact<{
  title: Scalars['String'];
}>;


export type CreateSizeMutation = (
  { __typename?: 'Mutation' }
  & { createSize: (
    { __typename?: 'SizeResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, size?: Maybe<(
      { __typename?: 'Size' }
      & Pick<Size, 'id' | 'title' | 'createdAt' | 'updatedAt'>
    )> }
  ) }
);

export type DeleteBrandMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteBrandMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteBrand'>
);

export type DeleteProductMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteProductMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteProduct'>
);

export type DeleteSizeMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteSizeMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteSize'>
);

export type EditBrandMutationVariables = Exact<{
  id: Scalars['Int'];
  title: Scalars['String'];
}>;


export type EditBrandMutation = (
  { __typename?: 'Mutation' }
  & { editBrand: (
    { __typename?: 'BrandResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, brand?: Maybe<(
      { __typename?: 'Brand' }
      & Pick<Brand, 'id' | 'title' | 'createdAt' | 'updatedAt'>
    )> }
  ) }
);

export type EditPriceMutationVariables = Exact<{
  id: Scalars['Int'];
  size: Scalars['String'];
  amount: Scalars['Float'];
}>;


export type EditPriceMutation = (
  { __typename?: 'Mutation' }
  & { editPrice: (
    { __typename?: 'PriceResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, price?: Maybe<(
      { __typename?: 'Price' }
      & Pick<Price, 'id' | 'amount' | 'size' | 'createdAt' | 'updatedAt'>
    )> }
  ) }
);

export type EditProductMutationVariables = Exact<{
  id: Scalars['Int'];
  brandId: Scalars['Int'];
  title: Scalars['String'];
  brandCode: Scalars['String'];
}>;


export type EditProductMutation = (
  { __typename?: 'Mutation' }
  & { editProduct: (
    { __typename?: 'ProductResponse' }
    & { product?: Maybe<(
      { __typename?: 'Product' }
      & Pick<Product, 'id' | 'title' | 'brandCode' | 'createdAt' | 'updatedAt'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type EditSizeMutationVariables = Exact<{
  id: Scalars['Int'];
  title: Scalars['String'];
}>;


export type EditSizeMutation = (
  { __typename?: 'Mutation' }
  & { editSize: (
    { __typename?: 'SizeResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, size?: Maybe<(
      { __typename?: 'Size' }
      & Pick<Size, 'id' | 'title' | 'createdAt' | 'updatedAt'>
    )> }
  ) }
);

export type ProductWithRelationsQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ProductWithRelationsQuery = (
  { __typename?: 'Query' }
  & { product?: Maybe<(
    { __typename?: 'Product' }
    & Pick<Product, 'id' | 'title' | 'brandCode'>
    & { brand: (
      { __typename?: 'Brand' }
      & Pick<Brand, 'id' | 'title'>
    ), prices: Array<(
      { __typename?: 'Price' }
      & Pick<Price, 'id' | 'amount' | 'size' | 'updatedAt'>
    )> }
  )> }
);

export type BrandQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type BrandQuery = (
  { __typename?: 'Query' }
  & { brand?: Maybe<(
    { __typename?: 'Brand' }
    & Pick<Brand, 'id' | 'title' | 'createdAt' | 'updatedAt'>
  )> }
);

export type PriceQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type PriceQuery = (
  { __typename?: 'Query' }
  & { price?: Maybe<(
    { __typename?: 'Price' }
    & Pick<Price, 'id' | 'amount' | 'size'>
  )> }
);

export type ProductsQueryVariables = Exact<{
  term?: Maybe<Scalars['String']>;
  brandId?: Maybe<Scalars['Int']>;
}>;


export type ProductsQuery = (
  { __typename?: 'Query' }
  & { products: Array<(
    { __typename?: 'Product' }
    & Pick<Product, 'id' | 'title' | 'brandCode' | 'createdAt' | 'updatedAt'>
    & { brand: (
      { __typename?: 'Brand' }
      & Pick<Brand, 'id' | 'title'>
    ), prices: Array<(
      { __typename?: 'Price' }
      & Pick<Price, 'id' | 'amount' | 'size'>
    )> }
  )> }
);

export type SelectBrandsQueryVariables = Exact<{ [key: string]: never; }>;


export type SelectBrandsQuery = (
  { __typename?: 'Query' }
  & { brands: Array<(
    { __typename?: 'Brand' }
    & Pick<Brand, 'id' | 'title'>
  )> }
);

export type SizeQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type SizeQuery = (
  { __typename?: 'Query' }
  & { size?: Maybe<(
    { __typename?: 'Size' }
    & Pick<Size, 'id' | 'title' | 'createdAt' | 'updatedAt'>
  )> }
);

export type SizesQueryVariables = Exact<{ [key: string]: never; }>;


export type SizesQuery = (
  { __typename?: 'Query' }
  & { sizes: Array<(
    { __typename?: 'Size' }
    & Pick<Size, 'id' | 'title' | 'createdAt' | 'updatedAt'>
  )> }
);


export const CreatePriceDocument = gql`
    mutation CreatePrice($productId: Int!, $size: String!, $amount: Float!) {
  createPrice(productId: $productId, size: $size, amount: $amount) {
    errors {
      field
      message
    }
    price {
      id
      amount
      size
      createdAt
      updatedAt
    }
  }
}
    `;
export type CreatePriceMutationFn = Apollo.MutationFunction<CreatePriceMutation, CreatePriceMutationVariables>;

/**
 * __useCreatePriceMutation__
 *
 * To run a mutation, you first call `useCreatePriceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePriceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPriceMutation, { data, loading, error }] = useCreatePriceMutation({
 *   variables: {
 *      productId: // value for 'productId'
 *      size: // value for 'size'
 *      amount: // value for 'amount'
 *   },
 * });
 */
export function useCreatePriceMutation(baseOptions?: Apollo.MutationHookOptions<CreatePriceMutation, CreatePriceMutationVariables>) {
        return Apollo.useMutation<CreatePriceMutation, CreatePriceMutationVariables>(CreatePriceDocument, baseOptions);
      }
export type CreatePriceMutationHookResult = ReturnType<typeof useCreatePriceMutation>;
export type CreatePriceMutationResult = Apollo.MutationResult<CreatePriceMutation>;
export type CreatePriceMutationOptions = Apollo.BaseMutationOptions<CreatePriceMutation, CreatePriceMutationVariables>;
export const DeletePriceDocument = gql`
    mutation DeletePrice($id: Int!) {
  deletePrice(id: $id)
}
    `;
export type DeletePriceMutationFn = Apollo.MutationFunction<DeletePriceMutation, DeletePriceMutationVariables>;

/**
 * __useDeletePriceMutation__
 *
 * To run a mutation, you first call `useDeletePriceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePriceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePriceMutation, { data, loading, error }] = useDeletePriceMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePriceMutation(baseOptions?: Apollo.MutationHookOptions<DeletePriceMutation, DeletePriceMutationVariables>) {
        return Apollo.useMutation<DeletePriceMutation, DeletePriceMutationVariables>(DeletePriceDocument, baseOptions);
      }
export type DeletePriceMutationHookResult = ReturnType<typeof useDeletePriceMutation>;
export type DeletePriceMutationResult = Apollo.MutationResult<DeletePriceMutation>;
export type DeletePriceMutationOptions = Apollo.BaseMutationOptions<DeletePriceMutation, DeletePriceMutationVariables>;
export const BrandsDocument = gql`
    query Brands {
  brands {
    id
    title
  }
}
    `;

/**
 * __useBrandsQuery__
 *
 * To run a query within a React component, call `useBrandsQuery` and pass it any options that fit your needs.
 * When your component renders, `useBrandsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBrandsQuery({
 *   variables: {
 *   },
 * });
 */
export function useBrandsQuery(baseOptions?: Apollo.QueryHookOptions<BrandsQuery, BrandsQueryVariables>) {
        return Apollo.useQuery<BrandsQuery, BrandsQueryVariables>(BrandsDocument, baseOptions);
      }
export function useBrandsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BrandsQuery, BrandsQueryVariables>) {
          return Apollo.useLazyQuery<BrandsQuery, BrandsQueryVariables>(BrandsDocument, baseOptions);
        }
export type BrandsQueryHookResult = ReturnType<typeof useBrandsQuery>;
export type BrandsLazyQueryHookResult = ReturnType<typeof useBrandsLazyQuery>;
export type BrandsQueryResult = Apollo.QueryResult<BrandsQuery, BrandsQueryVariables>;
export const CreateBrandDocument = gql`
    mutation CreateBrand($title: String!) {
  createBrand(title: $title) {
    errors {
      field
      message
    }
    brand {
      id
      title
      createdAt
      updatedAt
    }
  }
}
    `;
export type CreateBrandMutationFn = Apollo.MutationFunction<CreateBrandMutation, CreateBrandMutationVariables>;

/**
 * __useCreateBrandMutation__
 *
 * To run a mutation, you first call `useCreateBrandMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBrandMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBrandMutation, { data, loading, error }] = useCreateBrandMutation({
 *   variables: {
 *      title: // value for 'title'
 *   },
 * });
 */
export function useCreateBrandMutation(baseOptions?: Apollo.MutationHookOptions<CreateBrandMutation, CreateBrandMutationVariables>) {
        return Apollo.useMutation<CreateBrandMutation, CreateBrandMutationVariables>(CreateBrandDocument, baseOptions);
      }
export type CreateBrandMutationHookResult = ReturnType<typeof useCreateBrandMutation>;
export type CreateBrandMutationResult = Apollo.MutationResult<CreateBrandMutation>;
export type CreateBrandMutationOptions = Apollo.BaseMutationOptions<CreateBrandMutation, CreateBrandMutationVariables>;
export const CreateProductDocument = gql`
    mutation CreateProduct($brandId: Int!, $brandCode: String!, $title: String!) {
  createProduct(brandId: $brandId, brandCode: $brandCode, title: $title) {
    errors {
      field
      message
    }
    product {
      id
      title
      brandCode
      createdAt
      updatedAt
    }
  }
}
    `;
export type CreateProductMutationFn = Apollo.MutationFunction<CreateProductMutation, CreateProductMutationVariables>;

/**
 * __useCreateProductMutation__
 *
 * To run a mutation, you first call `useCreateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductMutation, { data, loading, error }] = useCreateProductMutation({
 *   variables: {
 *      brandId: // value for 'brandId'
 *      brandCode: // value for 'brandCode'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useCreateProductMutation(baseOptions?: Apollo.MutationHookOptions<CreateProductMutation, CreateProductMutationVariables>) {
        return Apollo.useMutation<CreateProductMutation, CreateProductMutationVariables>(CreateProductDocument, baseOptions);
      }
export type CreateProductMutationHookResult = ReturnType<typeof useCreateProductMutation>;
export type CreateProductMutationResult = Apollo.MutationResult<CreateProductMutation>;
export type CreateProductMutationOptions = Apollo.BaseMutationOptions<CreateProductMutation, CreateProductMutationVariables>;
export const CreateSizeDocument = gql`
    mutation CreateSize($title: String!) {
  createSize(title: $title) {
    errors {
      field
      message
    }
    size {
      id
      title
      createdAt
      updatedAt
    }
  }
}
    `;
export type CreateSizeMutationFn = Apollo.MutationFunction<CreateSizeMutation, CreateSizeMutationVariables>;

/**
 * __useCreateSizeMutation__
 *
 * To run a mutation, you first call `useCreateSizeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSizeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSizeMutation, { data, loading, error }] = useCreateSizeMutation({
 *   variables: {
 *      title: // value for 'title'
 *   },
 * });
 */
export function useCreateSizeMutation(baseOptions?: Apollo.MutationHookOptions<CreateSizeMutation, CreateSizeMutationVariables>) {
        return Apollo.useMutation<CreateSizeMutation, CreateSizeMutationVariables>(CreateSizeDocument, baseOptions);
      }
export type CreateSizeMutationHookResult = ReturnType<typeof useCreateSizeMutation>;
export type CreateSizeMutationResult = Apollo.MutationResult<CreateSizeMutation>;
export type CreateSizeMutationOptions = Apollo.BaseMutationOptions<CreateSizeMutation, CreateSizeMutationVariables>;
export const DeleteBrandDocument = gql`
    mutation DeleteBrand($id: Int!) {
  deleteBrand(id: $id)
}
    `;
export type DeleteBrandMutationFn = Apollo.MutationFunction<DeleteBrandMutation, DeleteBrandMutationVariables>;

/**
 * __useDeleteBrandMutation__
 *
 * To run a mutation, you first call `useDeleteBrandMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBrandMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBrandMutation, { data, loading, error }] = useDeleteBrandMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteBrandMutation(baseOptions?: Apollo.MutationHookOptions<DeleteBrandMutation, DeleteBrandMutationVariables>) {
        return Apollo.useMutation<DeleteBrandMutation, DeleteBrandMutationVariables>(DeleteBrandDocument, baseOptions);
      }
export type DeleteBrandMutationHookResult = ReturnType<typeof useDeleteBrandMutation>;
export type DeleteBrandMutationResult = Apollo.MutationResult<DeleteBrandMutation>;
export type DeleteBrandMutationOptions = Apollo.BaseMutationOptions<DeleteBrandMutation, DeleteBrandMutationVariables>;
export const DeleteProductDocument = gql`
    mutation DeleteProduct($id: Int!) {
  deleteProduct(id: $id)
}
    `;
export type DeleteProductMutationFn = Apollo.MutationFunction<DeleteProductMutation, DeleteProductMutationVariables>;

/**
 * __useDeleteProductMutation__
 *
 * To run a mutation, you first call `useDeleteProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProductMutation, { data, loading, error }] = useDeleteProductMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteProductMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProductMutation, DeleteProductMutationVariables>) {
        return Apollo.useMutation<DeleteProductMutation, DeleteProductMutationVariables>(DeleteProductDocument, baseOptions);
      }
export type DeleteProductMutationHookResult = ReturnType<typeof useDeleteProductMutation>;
export type DeleteProductMutationResult = Apollo.MutationResult<DeleteProductMutation>;
export type DeleteProductMutationOptions = Apollo.BaseMutationOptions<DeleteProductMutation, DeleteProductMutationVariables>;
export const DeleteSizeDocument = gql`
    mutation DeleteSize($id: Int!) {
  deleteSize(id: $id)
}
    `;
export type DeleteSizeMutationFn = Apollo.MutationFunction<DeleteSizeMutation, DeleteSizeMutationVariables>;

/**
 * __useDeleteSizeMutation__
 *
 * To run a mutation, you first call `useDeleteSizeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSizeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSizeMutation, { data, loading, error }] = useDeleteSizeMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteSizeMutation(baseOptions?: Apollo.MutationHookOptions<DeleteSizeMutation, DeleteSizeMutationVariables>) {
        return Apollo.useMutation<DeleteSizeMutation, DeleteSizeMutationVariables>(DeleteSizeDocument, baseOptions);
      }
export type DeleteSizeMutationHookResult = ReturnType<typeof useDeleteSizeMutation>;
export type DeleteSizeMutationResult = Apollo.MutationResult<DeleteSizeMutation>;
export type DeleteSizeMutationOptions = Apollo.BaseMutationOptions<DeleteSizeMutation, DeleteSizeMutationVariables>;
export const EditBrandDocument = gql`
    mutation EditBrand($id: Int!, $title: String!) {
  editBrand(id: $id, title: $title) {
    errors {
      field
      message
    }
    brand {
      id
      title
      createdAt
      updatedAt
    }
  }
}
    `;
export type EditBrandMutationFn = Apollo.MutationFunction<EditBrandMutation, EditBrandMutationVariables>;

/**
 * __useEditBrandMutation__
 *
 * To run a mutation, you first call `useEditBrandMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditBrandMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editBrandMutation, { data, loading, error }] = useEditBrandMutation({
 *   variables: {
 *      id: // value for 'id'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useEditBrandMutation(baseOptions?: Apollo.MutationHookOptions<EditBrandMutation, EditBrandMutationVariables>) {
        return Apollo.useMutation<EditBrandMutation, EditBrandMutationVariables>(EditBrandDocument, baseOptions);
      }
export type EditBrandMutationHookResult = ReturnType<typeof useEditBrandMutation>;
export type EditBrandMutationResult = Apollo.MutationResult<EditBrandMutation>;
export type EditBrandMutationOptions = Apollo.BaseMutationOptions<EditBrandMutation, EditBrandMutationVariables>;
export const EditPriceDocument = gql`
    mutation EditPrice($id: Int!, $size: String!, $amount: Float!) {
  editPrice(id: $id, size: $size, amount: $amount) {
    errors {
      field
      message
    }
    price {
      id
      amount
      size
      createdAt
      updatedAt
    }
  }
}
    `;
export type EditPriceMutationFn = Apollo.MutationFunction<EditPriceMutation, EditPriceMutationVariables>;

/**
 * __useEditPriceMutation__
 *
 * To run a mutation, you first call `useEditPriceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditPriceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editPriceMutation, { data, loading, error }] = useEditPriceMutation({
 *   variables: {
 *      id: // value for 'id'
 *      size: // value for 'size'
 *      amount: // value for 'amount'
 *   },
 * });
 */
export function useEditPriceMutation(baseOptions?: Apollo.MutationHookOptions<EditPriceMutation, EditPriceMutationVariables>) {
        return Apollo.useMutation<EditPriceMutation, EditPriceMutationVariables>(EditPriceDocument, baseOptions);
      }
export type EditPriceMutationHookResult = ReturnType<typeof useEditPriceMutation>;
export type EditPriceMutationResult = Apollo.MutationResult<EditPriceMutation>;
export type EditPriceMutationOptions = Apollo.BaseMutationOptions<EditPriceMutation, EditPriceMutationVariables>;
export const EditProductDocument = gql`
    mutation EditProduct($id: Int!, $brandId: Int!, $title: String!, $brandCode: String!) {
  editProduct(id: $id, brandId: $brandId, title: $title, brandCode: $brandCode) {
    product {
      id
      title
      brandCode
      createdAt
      updatedAt
    }
    errors {
      field
      message
    }
  }
}
    `;
export type EditProductMutationFn = Apollo.MutationFunction<EditProductMutation, EditProductMutationVariables>;

/**
 * __useEditProductMutation__
 *
 * To run a mutation, you first call `useEditProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editProductMutation, { data, loading, error }] = useEditProductMutation({
 *   variables: {
 *      id: // value for 'id'
 *      brandId: // value for 'brandId'
 *      title: // value for 'title'
 *      brandCode: // value for 'brandCode'
 *   },
 * });
 */
export function useEditProductMutation(baseOptions?: Apollo.MutationHookOptions<EditProductMutation, EditProductMutationVariables>) {
        return Apollo.useMutation<EditProductMutation, EditProductMutationVariables>(EditProductDocument, baseOptions);
      }
export type EditProductMutationHookResult = ReturnType<typeof useEditProductMutation>;
export type EditProductMutationResult = Apollo.MutationResult<EditProductMutation>;
export type EditProductMutationOptions = Apollo.BaseMutationOptions<EditProductMutation, EditProductMutationVariables>;
export const EditSizeDocument = gql`
    mutation EditSize($id: Int!, $title: String!) {
  editSize(id: $id, title: $title) {
    errors {
      field
      message
    }
    size {
      id
      title
      createdAt
      updatedAt
    }
  }
}
    `;
export type EditSizeMutationFn = Apollo.MutationFunction<EditSizeMutation, EditSizeMutationVariables>;

/**
 * __useEditSizeMutation__
 *
 * To run a mutation, you first call `useEditSizeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditSizeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editSizeMutation, { data, loading, error }] = useEditSizeMutation({
 *   variables: {
 *      id: // value for 'id'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useEditSizeMutation(baseOptions?: Apollo.MutationHookOptions<EditSizeMutation, EditSizeMutationVariables>) {
        return Apollo.useMutation<EditSizeMutation, EditSizeMutationVariables>(EditSizeDocument, baseOptions);
      }
export type EditSizeMutationHookResult = ReturnType<typeof useEditSizeMutation>;
export type EditSizeMutationResult = Apollo.MutationResult<EditSizeMutation>;
export type EditSizeMutationOptions = Apollo.BaseMutationOptions<EditSizeMutation, EditSizeMutationVariables>;
export const ProductWithRelationsDocument = gql`
    query ProductWithRelations($id: Int!) {
  product(id: $id) {
    id
    title
    brandCode
    brand {
      id
      title
    }
    prices {
      id
      amount
      size
      updatedAt
    }
  }
}
    `;

/**
 * __useProductWithRelationsQuery__
 *
 * To run a query within a React component, call `useProductWithRelationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductWithRelationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductWithRelationsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useProductWithRelationsQuery(baseOptions?: Apollo.QueryHookOptions<ProductWithRelationsQuery, ProductWithRelationsQueryVariables>) {
        return Apollo.useQuery<ProductWithRelationsQuery, ProductWithRelationsQueryVariables>(ProductWithRelationsDocument, baseOptions);
      }
export function useProductWithRelationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductWithRelationsQuery, ProductWithRelationsQueryVariables>) {
          return Apollo.useLazyQuery<ProductWithRelationsQuery, ProductWithRelationsQueryVariables>(ProductWithRelationsDocument, baseOptions);
        }
export type ProductWithRelationsQueryHookResult = ReturnType<typeof useProductWithRelationsQuery>;
export type ProductWithRelationsLazyQueryHookResult = ReturnType<typeof useProductWithRelationsLazyQuery>;
export type ProductWithRelationsQueryResult = Apollo.QueryResult<ProductWithRelationsQuery, ProductWithRelationsQueryVariables>;
export const BrandDocument = gql`
    query Brand($id: Int!) {
  brand(id: $id) {
    id
    title
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useBrandQuery__
 *
 * To run a query within a React component, call `useBrandQuery` and pass it any options that fit your needs.
 * When your component renders, `useBrandQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBrandQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useBrandQuery(baseOptions?: Apollo.QueryHookOptions<BrandQuery, BrandQueryVariables>) {
        return Apollo.useQuery<BrandQuery, BrandQueryVariables>(BrandDocument, baseOptions);
      }
export function useBrandLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BrandQuery, BrandQueryVariables>) {
          return Apollo.useLazyQuery<BrandQuery, BrandQueryVariables>(BrandDocument, baseOptions);
        }
export type BrandQueryHookResult = ReturnType<typeof useBrandQuery>;
export type BrandLazyQueryHookResult = ReturnType<typeof useBrandLazyQuery>;
export type BrandQueryResult = Apollo.QueryResult<BrandQuery, BrandQueryVariables>;
export const PriceDocument = gql`
    query Price($id: Int!) {
  price(id: $id) {
    id
    amount
    size
  }
}
    `;

/**
 * __usePriceQuery__
 *
 * To run a query within a React component, call `usePriceQuery` and pass it any options that fit your needs.
 * When your component renders, `usePriceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePriceQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePriceQuery(baseOptions?: Apollo.QueryHookOptions<PriceQuery, PriceQueryVariables>) {
        return Apollo.useQuery<PriceQuery, PriceQueryVariables>(PriceDocument, baseOptions);
      }
export function usePriceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PriceQuery, PriceQueryVariables>) {
          return Apollo.useLazyQuery<PriceQuery, PriceQueryVariables>(PriceDocument, baseOptions);
        }
export type PriceQueryHookResult = ReturnType<typeof usePriceQuery>;
export type PriceLazyQueryHookResult = ReturnType<typeof usePriceLazyQuery>;
export type PriceQueryResult = Apollo.QueryResult<PriceQuery, PriceQueryVariables>;
export const ProductsDocument = gql`
    query Products($term: String, $brandId: Int) {
  products(term: $term, brandId: $brandId) {
    id
    title
    brandCode
    createdAt
    updatedAt
    brand {
      id
      title
    }
    prices {
      id
      amount
      size
    }
  }
}
    `;

/**
 * __useProductsQuery__
 *
 * To run a query within a React component, call `useProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductsQuery({
 *   variables: {
 *      term: // value for 'term'
 *      brandId: // value for 'brandId'
 *   },
 * });
 */
export function useProductsQuery(baseOptions?: Apollo.QueryHookOptions<ProductsQuery, ProductsQueryVariables>) {
        return Apollo.useQuery<ProductsQuery, ProductsQueryVariables>(ProductsDocument, baseOptions);
      }
export function useProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductsQuery, ProductsQueryVariables>) {
          return Apollo.useLazyQuery<ProductsQuery, ProductsQueryVariables>(ProductsDocument, baseOptions);
        }
export type ProductsQueryHookResult = ReturnType<typeof useProductsQuery>;
export type ProductsLazyQueryHookResult = ReturnType<typeof useProductsLazyQuery>;
export type ProductsQueryResult = Apollo.QueryResult<ProductsQuery, ProductsQueryVariables>;
export const SelectBrandsDocument = gql`
    query SelectBrands {
  brands {
    id
    title
  }
}
    `;

/**
 * __useSelectBrandsQuery__
 *
 * To run a query within a React component, call `useSelectBrandsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSelectBrandsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSelectBrandsQuery({
 *   variables: {
 *   },
 * });
 */
export function useSelectBrandsQuery(baseOptions?: Apollo.QueryHookOptions<SelectBrandsQuery, SelectBrandsQueryVariables>) {
        return Apollo.useQuery<SelectBrandsQuery, SelectBrandsQueryVariables>(SelectBrandsDocument, baseOptions);
      }
export function useSelectBrandsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SelectBrandsQuery, SelectBrandsQueryVariables>) {
          return Apollo.useLazyQuery<SelectBrandsQuery, SelectBrandsQueryVariables>(SelectBrandsDocument, baseOptions);
        }
export type SelectBrandsQueryHookResult = ReturnType<typeof useSelectBrandsQuery>;
export type SelectBrandsLazyQueryHookResult = ReturnType<typeof useSelectBrandsLazyQuery>;
export type SelectBrandsQueryResult = Apollo.QueryResult<SelectBrandsQuery, SelectBrandsQueryVariables>;
export const SizeDocument = gql`
    query Size($id: Int!) {
  size(id: $id) {
    id
    title
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useSizeQuery__
 *
 * To run a query within a React component, call `useSizeQuery` and pass it any options that fit your needs.
 * When your component renders, `useSizeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSizeQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSizeQuery(baseOptions?: Apollo.QueryHookOptions<SizeQuery, SizeQueryVariables>) {
        return Apollo.useQuery<SizeQuery, SizeQueryVariables>(SizeDocument, baseOptions);
      }
export function useSizeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SizeQuery, SizeQueryVariables>) {
          return Apollo.useLazyQuery<SizeQuery, SizeQueryVariables>(SizeDocument, baseOptions);
        }
export type SizeQueryHookResult = ReturnType<typeof useSizeQuery>;
export type SizeLazyQueryHookResult = ReturnType<typeof useSizeLazyQuery>;
export type SizeQueryResult = Apollo.QueryResult<SizeQuery, SizeQueryVariables>;
export const SizesDocument = gql`
    query Sizes {
  sizes {
    id
    title
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useSizesQuery__
 *
 * To run a query within a React component, call `useSizesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSizesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSizesQuery({
 *   variables: {
 *   },
 * });
 */
export function useSizesQuery(baseOptions?: Apollo.QueryHookOptions<SizesQuery, SizesQueryVariables>) {
        return Apollo.useQuery<SizesQuery, SizesQueryVariables>(SizesDocument, baseOptions);
      }
export function useSizesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SizesQuery, SizesQueryVariables>) {
          return Apollo.useLazyQuery<SizesQuery, SizesQueryVariables>(SizesDocument, baseOptions);
        }
export type SizesQueryHookResult = ReturnType<typeof useSizesQuery>;
export type SizesLazyQueryHookResult = ReturnType<typeof useSizesLazyQuery>;
export type SizesQueryResult = Apollo.QueryResult<SizesQuery, SizesQueryVariables>;