import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Card from '../components/Card';
import { Input } from '../components/Input';
import Layout from '../components/Layout';
import SelectField from '../components/SelectField';
import {
  useCategoriesQuery,
  useCreateProductMutation,
  useSelectBrandsQuery,
} from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';

interface CreateProductProps {}

const CreateProduct: React.FC<CreateProductProps> = ({}) => {
  const { data, loading } = useSelectBrandsQuery();
  const {
    data: dataCategories,
    loading: loadingCategories,
  } = useCategoriesQuery();
  const [createProduct] = useCreateProductMutation();
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem('token')) router.push('/login');
  }, []);

  return (
    <Layout>
      <Card header="Crear Producto" backLink="/products">
        <Formik
          initialValues={{
            title: '',
            brandCode: '',
            brandId: 'default',
            categoriesIds: [],
          }}
          onSubmit={async (values, { setErrors }) => {
            if (values.brandId === 'default') {
              setErrors({ brandId: 'Selecciona una marca' });
              return;
            }

            const response = await createProduct({
              variables: {
                title: values.title,
                brandCode: values.brandCode,
                brandId: parseInt(values.brandId),
                categoriesIds: values.categoriesIds,
              },
              update: (cache) => {
                cache.evict({ fieldName: 'products' });
              },
            });

            if (response.data?.createProduct.errors) {
              setErrors(toErrorMap(response.data.createProduct.errors));
            } else {
              router.push('/products');
            }
          }}>
          <Form className="w-2/3 m-auto">
            <Input
              name="title"
              placeholder="Remera"
              label="Nombre"
              type="text"
              required
            />
            <div className="mt-3">
              <Input
                name="brandCode"
                placeholder="Código"
                label="Código del producto"
                type="text"
                required
              />
            </div>
            <div className="mt-3">
              {!loading ? (
                <Field
                  name="brandId"
                  component={SelectField}
                  label="Marca"
                  placeholder="Selecciona una Marca"
                  options={data.brands.map((brand) => ({
                    value: brand.id,
                    label: brand.title,
                  }))}
                />
              ) : null}
            </div>
            <div className="mt-3">
              {!loadingCategories ? (
                <Field
                  name="categoriesIds"
                  component={SelectField}
                  label="Categories"
                  placeholder="Selecciona Categorias"
                  options={dataCategories.categories.map((category) => ({
                    value: category.id,
                    label: category.title,
                  }))}
                  isMulti
                />
              ) : null}
            </div>
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

export default CreateProduct;
