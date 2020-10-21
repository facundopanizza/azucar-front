import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import Card from '../../../components/Card';
import { Input } from '../../../components/Input';
import Layout from '../../../components/Layout';
import MessageCenter from '../../../components/MessageCenter';
import SelectField from '../../../components/SelectField';
import {
  useCategoriesQuery,
  useEditProductMutation,
  useSelectBrandsQuery,
} from '../../../generated/graphql';
import { toErrorMap } from '../../../utils/toErrorMap';
import useGetProductFromUrl from '../../../utils/useGetProductFromUrl';

interface CreateProductProps {}

const CreateProduct: React.FC<CreateProductProps> = ({}) => {
  const {
    data: productData,
    loading: productLoading,
    error,
  } = useGetProductFromUrl();
  const {
    data: dataCategories,
    loading: loadingCategories,
  } = useCategoriesQuery();
  const { data, loading } = useSelectBrandsQuery();
  const [editProductMutation] = useEditProductMutation();
  const router = useRouter();

  if (loading || productLoading || !productData) {
    return <MessageCenter text="Cargando..." />;
  }

  if (error) {
    return <MessageCenter text={error.message} />;
  }

  if (!productData.product) {
    return <MessageCenter text="Este producto no existe." />;
  }

  return (
    <Layout>
      <Card header="Editar Producto" backLink="/products">
        <Formik
          initialValues={{
            title: productData.product.title,
            brandCode: productData.product.brandCode,
            brandId: productData.product.brand.id,
            categoriesIds: productData.product.categories.map(
              (category) => category.id
            ),
          }}
          onSubmit={async (values, { setErrors }) => {
            const response = await editProductMutation({
              variables: {
                id: productData.product.id,
                title: values.title,
                brandCode: values.brandCode,
                brandId: values.brandId,
                categoriesIds: values.categoriesIds,
              },
            });

            if (response.data?.editProduct.errors) {
              setErrors(toErrorMap(response.data.editProduct.errors));
            } else {
              router.push(`/products/${productData.product.id}`);
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
              {!loading && (
                <Field
                  component={SelectField}
                  name="brandId"
                  label="Marca"
                  placeholder="Selecciona una marca"
                  options={data.brands.map((brand) => ({
                    value: brand.id,
                    label: brand.title,
                  }))}
                />
              )}
            </div>
            <div className="mt-3">
              {!loadingCategories && (
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
              )}
            </div>
            <button
              className="mb-2 mt-3 bg-brand py-2 px-4 rounded text-white"
              type="submit">
              editar producto
            </button>
          </Form>
        </Formik>
      </Card>
    </Layout>
  );
};

export default CreateProduct;
