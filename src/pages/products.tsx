import Nav from '../components/nav';
import { useProductsQuery } from '../generated/graphql';
import Link from 'next/link';

export default function Products() {
  const { data, error, loading } = useProductsQuery();

  if (error) {
    return <div>{error.message}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Nav />
      <div className="container m-auto">
        <Link href="/create-product">
          <div className="bg-brand text-white py-2 px-4 rounded mb-4 float-right cursor-pointer">
            Crear Producto
          </div>
        </Link>
        <table className="w-full text-center table-auto">
          <thead className="bg-gray-400">
            <tr>
              <th className="py-4">ID</th>
              <th className="py-4">Nombre</th>
              <th className="py-4">Código</th>
              <th className="py-4">Marca</th>
              <th className="py-4">Talles</th>
            </tr>
          </thead>
          <tbody>
            {data.products.map((product) => {
              return (
                <tr key={product.id} className="border hover:bg-gray-300">
                  <td className="py-4">{product.id}</td>
                  <td className="py-4">{product.title}</td>
                  <td className="py-4">{product.brandCode}</td>
                  <td className="py-4">{product.brand.title}</td>
                  <td className="py-4">
                    {product.prices.map((price) => {
                      return (
                        <div key={price.id}>
                          <strong>{price.size}:</strong> {price.amount}
                        </div>
                      );
                    })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
