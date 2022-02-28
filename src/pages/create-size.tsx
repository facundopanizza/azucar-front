import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Card from '../components/Card';
import { Input } from '../components/Input';
import Layout from '../components/Layout';
import { useCreateSizeMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';

interface CreateSizeProps {}

const CreateSize: React.FC<CreateSizeProps> = ({}) => {
  const [createSizeMutation] = useCreateSizeMutation();
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem('token')) router.push('/login');
  }, []);

  return (
    <Layout>
      <Card header="Crear Talle" backLink="/sizes">
        <Formik
          initialValues={{ title: '' }}
          onSubmit={async (values, { setErrors }) => {
            const response = await createSizeMutation({
              variables: {
                title: values.title,
              },
              update: (cache) => {
                cache.evict({ fieldName: 'sizes' });
              },
            });

            if (response.data?.createSize.errors) {
              setErrors(toErrorMap(response.data.createSize.errors));
            } else {
              router.push('/sizes');
            }
          }}>
          <Form className="w-2/3 m-auto">
            <Input
              name="title"
              placeholder="xxxl"
              label="Talle"
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

export default CreateSize;
