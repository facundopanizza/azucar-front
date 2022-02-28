import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import MessageCenter from '../components/MessageCenter';
import Select, { ActionMeta, ValueType } from 'react-select';
import {
  useCategoriesQuery,
  useProductsLazyQuery,
  useSelectBrandsQuery,
} from '../generated/graphql';
import Pagination from 'react-js-pagination';

type MyOptionType = { label: string; value: number };

export default function Products() {
  const limit = 20;
  const router = useRouter();
  const { data: brandData, loading: brandLoading } = useSelectBrandsQuery();
  const {
    data: dataCategories,
    loading: loadingCategories,
  } = useCategoriesQuery();
  const [
    producstQuery,
    { data, error, loading, refetch },
  ] = useProductsLazyQuery({ variables: { limit } });
  const [selectedBrand, setSelectedBrand] = useState<MyOptionType>();
  const [selectedCategory, setSelectedCategory] = useState<MyOptionType>();
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!localStorage.getItem('token')) router.push('/login');

    producstQuery({
      variables: {
        term: router.query.term && (router.query.term as string),
        brandId:
          router.query.brandId && parseInt(router.query.brandId as string),
        categoryId:
          router.query.categoryId &&
          parseInt(router.query.categoryId as string),
      },
    });
  }, [
    router.query.categoryId,
    router.query.term,
    router.query.brandId,
    producstQuery,
  ]);

  if (error) {
    return <MessageCenter text={error.message} />;
  }

  if (loading || !data) {
    return <MessageCenter text="Cargando..." />;
  }

  const renderBrandSelect = () => {
    return (
      <Select
        onChange={(brand: MyOptionType) => {
          setSelectedBrand(brand);

          router.push({
            pathname: '/products',
            query: {
              ...router.query,
              brandId: brand.value,
            },
          });
        }}
        value={selectedBrand}
        options={brandData.brands.map((brand) => ({
          value: brand.id,
          label: brand.title,
        }))}
        styles={{
          control: (styles) => ({ ...styles, border: 'solid 1px #ca4e4e' }),
        }}
        className="w-56"
        placeholder="Filtrar por Marca"
      />
    );
  };

  const renderCategorySelect = () => {
    return (
      <Select
        onChange={(category: MyOptionType) => {
          setSelectedCategory(category);

          router.push({
            pathname: '/products',
            query: {
              ...router.query,
              categoryId: category.value,
            },
          });
        }}
        value={selectedCategory}
        options={dataCategories.categories.map((category) => ({
          value: category.id,
          label: category.title,
        }))}
        styles={{
          control: (styles) => ({ ...styles, border: 'solid 1px #ca4e4e' }),
        }}
        className="w-56"
        placeholder="Filtrar por Categoria"
      />
    );
  };

  const pagination = data.products.pagination;

  const changePage = (page: number) => {
    refetch({
      term: router.query.term && (router.query.term as string),
      brandId: router.query.brandId && parseInt(router.query.brandId as string),
      categoryId:
        router.query.categoryId && parseInt(router.query.categoryId as string),
      limit: 20,
      offset: (page - 1) * pagination.limit,
    });

    setPage(page);
  };

  return (
    <Layout>
      <div className="container m-auto">
        <div className="flex justify-around flex-wrap">
          <h1 className="text-2xl self-center">Productos</h1>
          <div className="hidden sm:block">
            {!brandLoading && renderBrandSelect()}
          </div>
          <div className="hidden sm:block">
            {!loadingCategories && renderCategorySelect()}
          </div>
          <Link href="/create-product">
            <button className="bg-brand text-white py-2 px-4 rounded mb-4 float-right cursor-pointer">
              crear producto
            </button>
          </Link>
        </div>
        <div className="flex flex-wrap mb-3 justify-around sm:hidden">
          <div className="sm:mr-3 mb-2 sm:mb-0">
            {!brandLoading && renderBrandSelect()}
          </div>
          {!loadingCategories && renderCategorySelect()}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-center table-auto">
            <thead className="bg-gray-400">
              <tr>
                <th className="py-4">Nombre</th>
                <th className="py-4">Código</th>
                <th className="py-4">Marca</th>
                <th className="py-4 hidden sm:block">Talles</th>
                <th className="py-4"></th>
              </tr>
            </thead>
            <tbody>
              {data.products.products.map((product) => {
                return (
                  <tr key={product.id} className="border hover:bg-gray-300">
                    <td className="py-4">{product.title}</td>
                    <td className="py-4">{product.brandCode}</td>
                    <td className="py-4">{product.brand.title}</td>
                    <td className="py-4 hidden sm:block">
                      {product.prices.map((price) => {
                        return (
                          <div key={price.id}>
                            <strong>{price.size}:</strong> {price.amount}
                          </div>
                        );
                      })}
                    </td>
                    <td className="py-4">
                      <Link href={`/products/${product.id}`}>
                        <button className="rounded px-4 py-1 bg-blue-300">
                          ver
                        </button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="my-3 flex justify-center">
        <Pagination
          activePage={page}
          itemsCountPerPage={pagination.limit}
          totalItemsCount={pagination.limit * pagination.pages}
          pageRangeDisplayed={5}
          onChange={(page) => changePage(page)}
          innerClass="flex inline-flex border border-brand rounded w-auto"
          itemClass="px-3 py-1 border-r"
          activeClass="bg-brand"
          hideNavigation
        />
      </div>
    </Layout>
  );
}
