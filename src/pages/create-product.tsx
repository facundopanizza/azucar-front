import React from 'react';
import Nav from '../components/nav';
import { Input } from '../components/input';
import { Formik, Form } from 'formik';
import { SelectField } from '../components/SelectField';
import {
  useSelectBrandsQuery,
  useCreateProductMutation,
} from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router';

interface CreateProductProps {}

const CreateProduct: React.FC<CreateProductProps> = ({}) => {
  const { data, loading } = useSelectBrandsQuery();
  const [createProduct] = useCreateProductMutation();
  const router = useRouter();

  return (
    <>
      <Nav />
      <div
        className="border m-auto rounded shadow"
        style={{ maxWidth: '700px' }}>
        <div className="bg-gray-300 p-2">Crear Producto</div>
        <div className="p-2">
          <Formik
            initialValues={{ title: '', brandCode: '', brandId: 'default' }}
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
              />
              <div className="mt-3">
                <Input
                  name="brandCode"
                  placeholder="Código"
                  label="Código del producto"
                  type="text"
                />
              </div>
              <div className="mt-3">
                {!loading ? (
                  <SelectField
                    name="brandId"
                    label="Marca"
                    placeholder="Selecciona una marca"
                    options={data.brands}
                    optionName="title"
                  />
                ) : null}
              </div>
              <button
                className="mb-2 mt-3 bg-brand py-2 px-4 rounded text-white"
                type="submit">
                crear producto
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
};

export default CreateProduct;
