import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import Card from '../components/Card';
import { Input } from '../components/Input';
import Layout from '../components/Layout';
import { useCreateCategoryMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';

interface CreateCategoriesProps {}

const CreateCategories: React.FC<CreateCategoriesProps> = ({}) => {
  const [createCategoryMutation] = useCreateCategoryMutation();
  const router = useRouter();

  return (
    <Layout>
      <Card header="Crear Categoría" backLink="/categories">
        <Formik
          initialValues={{ title: '' }}
          onSubmit={async (values, { setErrors }) => {
            const response = await createCategoryMutation({
              variables: {
                title: values.title,
              },
              update: (cache) => {
                cache.evict({ fieldName: 'categories' });
              },
            });

            if (response.data?.createCategory.errors) {
              setErrors(toErrorMap(response.data.createCategory.errors));
            } else {
              router.push('/categories');
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

export default CreateCategories;
