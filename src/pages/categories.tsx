import Link from 'next/link';
import React, { useState } from 'react';
import Layout from '../components/Layout';
import MessageCenter from '../components/MessageCenter';
import Modal from '../components/Modal';
import {
  useCategoriesQuery,
  useDeleteCategoryMutation,
  useDeleteSizeMutation,
  useSizesQuery,
} from '../generated/graphql';

export default function Brands() {
  const { data, error, loading } = useCategoriesQuery();
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedSize, setSelectedSize] = useState(-1);
  const [deleteCategoryMutation] = useDeleteCategoryMutation();

  if (error) {
    return <MessageCenter text={error.message} />;
  }

  if (loading) {
    return <MessageCenter text="Cargando..." />;
  }

  const renderDeleteSize = () => {
    return (
      <Modal state={[deleteModal, setDeleteModal]}>
        Estas seguro de que desea eliminar esta categoría?
        <div className="flex justify-center mt-3">
          <button
            onClick={() => setDeleteModal(false)}
            className="py-2 px-4 rounded bg-green-300 mr-3">
            no
          </button>
          <button
            onClick={deleteSize}
            className="py-2 px-4 border border-red-500 text-red-500 rounded">
            si, eliminar
          </button>
        </div>
      </Modal>
    );
  };

  const deleteSize = async () => {
    if (selectedSize === -1) return;

    await deleteCategoryMutation({
      variables: { id: selectedSize },
      update: (cache) => {
        cache.evict({ id: 'Category:' + selectedSize });
      },
    });

    setDeleteModal(false);
    setSelectedSize(-1);
  };

  return (
    <Layout>
      {renderDeleteSize()}
      <div className="container m-auto">
        <div className="flex justify-between">
          <h1 className="text-2xl self-center">Categorías</h1>
          <Link href="/create-category">
            <button className="bg-categories text-white py-2 px-4 rounded mb-4 float-right cursor-pointer">
              crear categoría
            </button>
          </Link>
        </div>

        <table className="w-full text-center table-auto">
          <thead className="bg-gray-400">
            <tr>
              <th className="py-4">ID</th>
              <th className="py-4">Categoría</th>
              <th className="py-4"></th>
            </tr>
          </thead>
          <tbody>
            {data.categories.map((category) => {
              return (
                <tr key={category.id} className="border hover:bg-gray-300">
                  <td className="py-4">{category.id}</td>
                  <td className="py-4">{category.title}</td>
                  <td className="py-4">
                    <Link href={`/categories/edit/${category.id}`}>
                      <button className="rounded px-4 py-1 bg-blue-300 mr-2">
                        editar
                      </button>
                    </Link>
                    <button
                      onClick={() => {
                        setSelectedSize(category.id);
                        setDeleteModal(true);
                      }}
                      className="rounded px-4 py-1 text-red-500 border border-red-500">
                      eliminar
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
