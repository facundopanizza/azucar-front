import React from 'react';
import { useField } from 'formik';

interface InputProps {
  name: string;
  label: string;
  placeholder: string;
  type: string;
  textarea?: boolean;
  required?: boolean;
}

export const Input: React.FC<InputProps> = ({ label, textarea, ...props }) => {
  const [field, { error }, { setValue, setTouched }] = useField(props.name);

  return (
    <>
      <div className="mb-1">
        <label htmlFor={field.name}>{label}</label>
      </div>
      {!textarea ? (
        <input
          className={`w-full border border-gray-500 focus:border-blue-500 rounded py-2 px-2 ${
            error ? 'border-red-500' : ''
          }`}
          {...field}
          {...props}
          id={field.name}
        />
      ) : null}
      {error ? <div className="text-red-600">{error}</div> : null}
    </>
  );
};
