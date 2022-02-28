import { Form, Formik } from 'formik';
import Router, { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Card from '../../../components/Card';
import { Input } from '../../../components/Input';
import Layout from '../../../components/Layout';
import MessageCenter from '../../../components/MessageCenter';
import { useEditBrandMutation } from '../../../generated/graphql';
import { toErrorMap } from '../../../utils/toErrorMap';
import useGetBrandFromUrl from '../../../utils/useGetBrandFromUrl';

interface EditBrandProps {}

const EditBrand: React.FC<EditBrandProps> = ({}) => {
  const router = useRouter();
  const { data, loading, error } = useGetBrandFromUrl();
  const [editBrandMutation] = useEditBrandMutation();

  useEffect(() => {
    if (!localStorage.getItem('token')) router.push('/login');
  }, []);

  if (loading || !data) {
    return <MessageCenter text="Cargando..." />;
  }

  if (error) {
    return <MessageCenter text={error.message} />;
  }

  if (!data.brand) {
    return <MessageCenter text="Esta marca no existe." />;
  }

  return (
    <Layout>
      <Card header="Editar Marca" backLink="/brands">
        <Formik
          initialValues={{ id: data.brand.id, title: data.brand.title }}
          onSubmit={async (values, { setErrors }) => {
            const response = await editBrandMutation({
              variables: {
                id: values.id,
                title: values.title,
              },
            });

            if (response.data?.editBrand.errors) {
              setErrors(toErrorMap(response.data.editBrand.errors));
            } else {
              Router.push('/brands');
            }
          }}>
          <Form className="w-2/3 m-auto">
            <Input
              name="title"
              placeholder="Bonjour Lulu"
              label="Nombre"
              type="text"
              required
            />
            <button
              className="mb-2 mt-3 bg-brand py-2 px-4 rounded text-white"
              type="submit">
              editar
            </button>
          </Form>
        </Formik>
      </Card>
    </Layout>
  );
};

export default EditBrand;
