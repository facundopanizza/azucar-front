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

export type ProductsQueryVariables = Exact<{ [key: string]: never; }>;


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
export const ProductsDocument = gql`
    query Products {
  products {
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