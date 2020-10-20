import Link from 'next/link';
import Router from 'next/router';
import React, { useState } from 'react';
import Layout from '../components/Layout';
import MessageCenter from '../components/MessageCenter';
import Modal from '../components/Modal';
import { useBrandsQuery, useDeleteBrandMutation } from '../generated/graphql';

export default function Brands() {
  const { data, error, loading } = useBrandsQuery();
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(-1);
  const [deleteBrandMutation] = useDeleteBrandMutation();

  if (error) {
    return <MessageCenter text={error.message} />;
  }

  if (loading) {
    return <MessageCenter text="Cargando..." />;
  }

  const renderDeleteBrand = () => {
    return (
      <Modal state={[deleteModal, setDeleteModal]}>
        Estas seguro de que desea eliminar esta marca?
        <div className="flex justify-center mt-3">
          <button
            onClick={() => setDeleteModal(false)}
            className="py-2 px-4 rounded bg-green-300 mr-3">
            no
          </button>
          <button
            onClick={deleteBrand}
            className="py-2 px-4 border border-red-500 text-red-500 rounded">
            si, eliminar
          </button>
        </div>
      </Modal>
    );
  };

  const deleteBrand = async () => {
    if (selectedBrand === -1) return;

    await deleteBrandMutation({
      variables: { id: selectedBrand },
      update: (cache) => {
        cache.evict({ id: 'Brand:' + selectedBrand });
      },
    });

    setDeleteModal(false);
    setSelectedBrand(-1);
  };

  return (
    <Layout>
      {renderDeleteBrand()}
      <div className="container m-auto">
        <div className="flex justify-between">
          <h1 className="text-2xl self-center">Marcas</h1>
          <Link href="/create-brand">
            <button className="bg-brand text-white py-2 px-4 rounded mb-4 float-right cursor-pointer">
              Crear Marca
            </button>
          </Link>
        </div>

        <table className="w-full text-center table-auto">
          <thead className="bg-gray-400">
            <tr>
              <th className="py-4">ID</th> <th className="py-4">Nombre</th>
              <th className="py-4"></th>
            </tr>
          </thead>
          <tbody>
            {data.brands.map((brand) => {
              return (
                <tr key={brand.id} className="border hover:bg-gray-300">
                  <td className="py-4">{brand.id}</td>
                  <td className="py-4">{brand.title}</td>
                  <td className="py-4">
                    <Link href={`/brands/edit/${brand.id}`}>
                      <button className="rounded px-4 py-1 bg-blue-300 mr-2">
                        editar
                      </button>
                    </Link>
                    <button
                      onClick={() => {
                        setSelectedBrand(brand.id);
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
