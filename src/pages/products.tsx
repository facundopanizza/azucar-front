import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import MessageCenter from '../components/MessageCenter';
import { SelectField } from '../components/SelectField';
import {
  useProductsLazyQuery,
  useSelectBrandsQuery,
} from '../generated/graphql';

export default function Products() {
  const router = useRouter();
  const { data: brandData, loading: brandLoading } = useSelectBrandsQuery();
  const [producstQuery, { data, error, loading }] = useProductsLazyQuery();
  const [selectedBrand, setSelectedBrand] = useState('');

  useEffect(() => {
    producstQuery({
      variables: {
        term: router.query.term && (router.query.term as string),
        brandId:
          router.query.brandId && parseInt(router.query.brandId as string),
      },
    });
  }, [router.query.term, router.query.brandId, producstQuery]);

  if (error) {
    return <MessageCenter text={error.message} />;
  }

  if (loading || !data) {
    return <MessageCenter text="Cargando..." />;
  }

  const renderSelect = () => {
    return (
      <select
        onChange={(e) => {
          setSelectedBrand(e.target.value);

          router.push({
            pathname: '/products',
            query: {
              term: router.query.term ? router.query.term : '',
              brandId: e.target.value,
            },
          });
        }}
        value={selectedBrand}
        className="px-4 py-2 rounded bg-white border border-brand">
        <option value="undefined">Filtrar por Marca</option>
        {brandData.brands.map((brand) => (
          <option key={brand.id} value={brand.id}>
            {brand.title}
          </option>
        ))}
      </select>
    );
  };

  return (
    <Layout>
      <div className="container m-auto">
        <div className="flex justify-between">
          <h1 className="text-2xl self-center">Productos</h1>
          <div className="hidden sm:block">
            {!brandLoading && renderSelect()}
          </div>
          <Link href="/create-product">
            <button className="bg-brand text-white py-2 px-4 rounded mb-4 float-right cursor-pointer">
              Crear Producto
            </button>
          </Link>
        </div>
        <div className="sm:hidden my-3">{!brandLoading && renderSelect()}</div>
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
              {data.products.map((product) => {
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
    </Layout>
  );
}
