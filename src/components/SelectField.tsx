import React from 'react';
import { useField, Field } from 'formik';
import Select from 'react-select';

interface InputProps {
  name: string;
  label: string;
  placeholder: string;
  options: any;
  optionName: string;
}

export const SelectField: React.FC<InputProps> = ({
  label,
  name,
  options,
  optionName,
  ...props
}) => {
  const [field, { error }, { setValue, setTouched }] = useField(name);

  return (
    <>
      <div className="mb-1">
        <label htmlFor={field.name}>{label}</label>
      </div>
      <Field
        as="select"
        name={field.name}
        className={`w-full border bg-white border-gray-500 focus:border-blue-500 rounded py-2 px-2 ${
          error ? 'border-red-500' : ''
        }`}>
        <option value="default">{props.placeholder}</option>
        {options.map((option) => {
          return (
            <option key={option.id} value={option.id}>
              {option[optionName]}
            </option>
          );
        })}
      </Field>
      {error ? <div className="text-red-600">{error}</div> : null}
    </>
  );
};
