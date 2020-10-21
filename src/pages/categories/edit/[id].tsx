import { Form, Formik } from 'formik';
import Router from 'next/router';
import React from 'react';
import Card from '../../../components/Card';
import { Input } from '../../../components/Input';
import Layout from '../../../components/Layout';
import MessageCenter from '../../../components/MessageCenter';
import { useEditCategoryMutation } from '../../../generated/graphql';
import { toErrorMap } from '../../../utils/toErrorMap';
import useGetCategoryFromUrl from '../../../utils/useGetCategoryFromUrl';

interface EditCategoriesProps {}

const EditCategories: React.FC<EditCategoriesProps> = ({}) => {
  const { data, loading, error } = useGetCategoryFromUrl();
  const [editCategoryMutation] = useEditCategoryMutation();

  if (loading || !data) {
    return <MessageCenter text="Cargando..." />;
  }

  if (error) {
    return <MessageCenter text={error.message} />;
  }

  if (!data.category) {
    return <MessageCenter text="Esta marca no existe." />;
  }

  return (
    <Layout>
      <Card header="Editar Marca" backLink="/categories">
        <Formik
          initialValues={{ id: data.category.id, title: data.category.title }}
          onSubmit={async (values, { setErrors }) => {
            const response = await editCategoryMutation({
              variables: {
                id: values.id,
                title: values.title,
              },
            });

            if (response.data?.editCategory.errors) {
              setErrors(toErrorMap(response.data.editCategory.errors));
            } else {
              Router.push('/categories');
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

export default EditCategories;
