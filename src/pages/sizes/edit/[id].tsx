import { Form, Formik } from 'formik';
import Router from 'next/router';
import React from 'react';
import Card from '../../../components/Card';
import { Input } from '../../../components/Input';
import Layout from '../../../components/Layout';
import MessageCenter from '../../../components/MessageCenter';
import { useEditSizeMutation } from '../../../generated/graphql';
import { toErrorMap } from '../../../utils/toErrorMap';
import useGetSizeFromUrl from '../../../utils/useGetSizeFromUrl';

interface EditSizeProps {}

const EditSize: React.FC<EditSizeProps> = ({}) => {
  const { data, loading, error } = useGetSizeFromUrl();
  const [editBrandMutation] = useEditSizeMutation();

  if (loading || !data) {
    return <MessageCenter text="Cargando..." />;
  }

  if (error) {
    return <MessageCenter text={error.message} />;
  }

  if (!data.size) {
    return <MessageCenter text="Este talle no existe." />;
  }

  return (
    <Layout>
      <Card header="Editar Talle" backLink="/sizes">
        <Formik
          initialValues={{ id: data.size.id, title: data.size.title }}
          onSubmit={async (values, { setErrors }) => {
            const response = await editBrandMutation({
              variables: {
                id: values.id,
                title: values.title,
              },
            });

            if (response.data?.editSize.errors) {
              setErrors(toErrorMap(response.data.editSize.errors));
            } else {
              Router.push('/sizes');
            }
          }}>
          <Form className="w-2/3 m-auto">
            <Input
              name="title"
              placeholder="xxl"
              label="Talle"
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

export default EditSize;
