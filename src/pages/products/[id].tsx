import { Field, Form, Formik } from 'formik';
import Router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Card from '../../components/Card';
import { Input } from '../../components/Input';
import ItemAndText from '../../components/ItemAndText';
import Layout from '../../components/Layout';
import MessageCenter from '../../components/MessageCenter';
import Modal from '../../components/Modal';
import SelectField from '../../components/SelectField';
import {
  useCreatePriceMutation,
  useDeletePriceMutation,
  useDeleteProductMutation,
  useEditPriceMutation,
  useSizesQuery,
} from '../../generated/graphql';
import useGetProductFromUrl from '../../utils/useGetProductFromUrl';

const Post: React.FC<{}> = () => {
  const router = useRouter();
  const { data, loading, error } = useGetProductFromUrl();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteIsOpen, setDeleteIsOpen] = useState(false);
  const [deleteProductIsOpen, setDeleteProductIsOpen] = useState(false);
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState(-1);
  const [createPriceMutation] = useCreatePriceMutation();
  const [editPriceMutation] = useEditPriceMutation();
  const [deletePriceMutation] = useDeletePriceMutation();
  const [deleteProductMutation] = useDeleteProductMutation();
  const { data: sizesData, loading: sizesLoading } = useSizesQuery();

  useEffect(() => {
    if (!localStorage.getItem('token')) router.push('/login');
  }, []);

  if (loading || !data) {
    return <MessageCenter text="Cargando..." />;
  }

  if (error) {
    return <MessageCenter text={error.message} />;
  }

  if (!data.product) {
    return <MessageCenter text="Este producto no existe." />;
  }

  const { product } = data;

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const onFormSubmit = async (values) => {
    await createPriceMutation({
      variables: values,
      update: (cache) => {
        cache.evict({ id: 'Product:' + values.productId });
      },
    });

    closeModal();
  };

  const renderPrices = () => {
    return data.product.prices.map((price) => {
      return (
        <tr key={price.id} className="border hover:bg-gray-300">
          <td className="py-4">{price.amount}</td>
          <td className="py-4">{price.size}</td>
          <td className="py-4">
            {new Date(Number(price.updatedAt)).toLocaleString('es-AR', {
              // @ts-ignore
              dateStyle: 'short',
            })}
          </td>
          <td>
            <div className="flex flex-wrap justify-center">
              <button
                onClick={() => {
                  setEditIsOpen(true);
                  setSelectedPrice(price.id);
                }}
                className="py-1 px-2 border bg-blue-300 rounded mr-2">
                editar
              </button>
              <button
                onClick={() => {
                  setDeleteIsOpen(true);
                  setSelectedPrice(price.id);
                }}
                className="py-1 px-2 border border-red-500 text-red-500 rounded">
                eliminar
              </button>
            </div>
          </td>
        </tr>
      );
    });
  };

  const deletePrice = async () => {
    await deletePriceMutation({
      variables: { id: selectedPrice },
      update: (cache) => {
        cache.evict({ id: 'Product:' + data.product.id });
      },
    });

    setDeleteIsOpen(false);
  };

  const deleteProduct = async () => {
    await deleteProductMutation({
      variables: { id: product.id },
      update: (cache) => {
        cache.evict({ id: 'Product:' + data.product.id });
      },
    });

    Router.push('/products');
  };

  const renderDeleteProductModal = () => {
    return (
      <Modal state={[deleteProductIsOpen, setDeleteProductIsOpen]}>
        Estas seguro de que desea eliminar este producto?
        <div className="flex justify-center mt-3">
          <button
            onClick={() => setDeleteProductIsOpen(false)}
            className="py-2 px-4 rounded bg-green-300 mr-3">
            no
          </button>
          <button
            onClick={() => deleteProduct()}
            className="py-2 px-4 border border-red-500 text-red-500 rounded">
            si, eliminar
          </button>
        </div>
      </Modal>
    );
  };

  const renderDeleteModal = () => {
    return (
      <Modal state={[deleteIsOpen, setDeleteIsOpen]}>
        Estas seguro de que desea eliminar este precio?
        <div className="flex justify-center mt-3">
          <button
            onClick={() => setDeleteIsOpen(false)}
            className="py-2 px-4 rounded bg-green-300 mr-3">
            no
          </button>
          <button
            onClick={() => deletePrice()}
            className="py-2 px-4 border border-red-500 text-red-500 rounded">
            si, eliminar
          </button>
        </div>
      </Modal>
    );
  };

  const renderCreatePriceModal = () => {
    return (
      <Modal state={[modalIsOpen, setModalIsOpen]}>
        <Formik
          initialValues={{ productId: product.id, size: '', amount: '' }}
          onSubmit={(values) => onFormSubmit(values)}>
          <Form>
            <div
              className="p-2 bg-gray-300 flex justify-between"
              style={{
                margin: '-20px -20px 0px -20px',
                paddingLeft: '20px',
                paddingRight: '20px',
              }}>
              <div>Nuevo Precio</div>
              <button onClick={closeModal}>
                <svg
                  className="h-6 text-gray-900 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="my-3">
              <Field
                component={SelectField}
                name="size"
                placeholder="Selecciona un Talle"
                label="Talle"
                options={sizesData.sizes.map((size) => ({
                  value: size.title,
                  label: size.title,
                }))}
              />
            </div>
            <div className="mb-3">
              <Input
                name="amount"
                label="Precio"
                placeholder="1000"
                type="number"
                required
              />
            </div>
            <button
              type="submit"
              onClick={() => setModalIsOpen(true)}
              className="rounded bg-brand text-white py-2 px-4 mt-2 w-full text-center">
              agregar
            </button>
          </Form>
        </Formik>
      </Modal>
    );
  };

  const renderEditPriceModal = () => {
    const index = product.prices.findIndex(
      (price) => price.id === selectedPrice
    );

    if (index === -1) {
      return;
    }

    const price = product.prices[index];

    return (
      <Modal state={[editIsOpen, setEditIsOpen]}>
        <Formik
          initialValues={{
            id: price.id,
            size: price.size,
            amount: price.amount,
          }}
          onSubmit={async (values) => {
            await editPriceMutation({
              variables: {
                id: values.id,
                amount: values.amount,
                size: values.size,
              },
              update: async (cache) => {
                await cache.evict({ id: 'Product:' + product.id });
              },
            });

            setEditIsOpen(false);
          }}>
          <Form>
            <div
              className="p-2 bg-gray-300 flex justify-between"
              style={{
                margin: '-20px -20px 0px -20px',
                paddingLeft: '20px',
                paddingRight: '20px',
              }}>
              <div>Editar Precio</div>
              <button onClick={() => setEditIsOpen(false)}>
                <svg
                  className="h-6 text-gray-900 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="my-3">
              <Field
                component={SelectField}
                name="size"
                placeholder="Selecciona un Talle"
                label="Talle"
                options={sizesData.sizes.map((size) => ({
                  value: size.title,
                  label: size.title,
                }))}
              />
            </div>
            <div className="mb-3">
              <Input
                name="amount"
                label="Precio"
                placeholder="1000"
                type="number"
                required
              />
            </div>
            <button
              type="submit"
              onClick={() => setEditIsOpen(true)}
              className="rounded bg-green-300 py-2 px-4 mt-2 w-full text-center">
              editar
            </button>
          </Form>
        </Formik>
      </Modal>
    );
  };

  return (
    <Layout>
      {renderDeleteModal()}
      {renderDeleteProductModal()}
      {renderCreatePriceModal()}
      {renderEditPriceModal()}
      <Card header={product.title} backLink="/products">
        <div className="flex justify-between">
          <div></div>
          <ItemAndText name="Marca" text={product.brand.title} />
          <ItemAndText name="Codigo de Marca" text={product.brandCode} />
          <ItemAndText
            name="Categorias"
            text={product.categories
              .map((category) => category.title)
              .join(', ')}
          />
          <div></div>
        </div>
        <div className="flex justify-between mt-2">
          <button
            onClick={() => setModalIsOpen(true)}
            className="rounded bg-brand text-white py-2 px-4 flex">
            <svg
              className="h-6 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="self-center">precio</span>
          </button>

          <div>
            <button
              onClick={() => Router.push(`/products/edit/${product.id}`)}
              className="rounded py-2 px-4 border bg-blue-300 mr-2">
              editar
            </button>
            <button
              onClick={() => setDeleteProductIsOpen(true)}
              className="rounded py-2 px-4 border text-red-500 border-red-500">
              eliminar
            </button>
          </div>
        </div>

        {product.prices.length !== 0 && (
          <div className="overflow-x-auto mt-2">
            <table className="w-full text-center table-auto">
              <thead className="bg-gray-400">
                <tr>
                  <th className="py-4">Precio</th>
                  <th className="py-4">Talle</th>
                  <th className="py-4">Fecha</th>
                  <th className="py-4"></th>
                </tr>
              </thead>
              <tbody>{renderPrices()}</tbody>
            </table>
          </div>
        )}
      </Card>
    </Layout>
  );
};

export default Post;
