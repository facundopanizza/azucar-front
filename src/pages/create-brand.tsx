import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Card from '../components/Card';
import { Input } from '../components/Input';
import Layout from '../components/Layout';
import { useCreateBrandMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';

interface CreateBrandProps {}

const CreateBrand: React.FC<CreateBrandProps> = ({}) => {
  const [createBrandMutation] = useCreateBrandMutation();
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem('token')) router.push('/login');
  }, []);

  return (
    <Layout>
      <Card header="Crear Marca" backLink="/brands">
        <Formik
          initialValues={{ title: '' }}
          onSubmit={async (values, { setErrors }) => {
            const response = await createBrandMutation({
              variables: {
                title: values.title,
              },
              update: (cache) => {
                cache.evict({ fieldName: 'brands' });
              },
            });

            if (response.data?.createBrand.errors) {
              setErrors(toErrorMap(response.data.createBrand.errors));
            } else {
              router.push('/brands');
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
              crear
            </button>
          </Form>
        </Formik>
      </Card>
    </Layout>
  );
};

export default CreateBrand;
