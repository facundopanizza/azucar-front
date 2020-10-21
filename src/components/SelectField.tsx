import { FieldProps } from 'formik';
import React from 'react';
import Select from 'react-select';
import { OptionsType, ValueType } from 'react-select';

interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps extends FieldProps {
  options: OptionsType<Option>;
  label: string;
  placeholder: string;
  isMulti?: boolean;
}

const SelectField = ({
  field,
  form,
  options,
  isMulti = false,
  label,
  placeholder,
}: CustomSelectProps) => {
  const onChange = (option: ValueType<Option | Option[]>) => {
    option = !option ? [] : option;

    form.setFieldValue(
      field.name,
      isMulti
        ? (option as Option[]).map((item: Option) => item.value)
        : (option as Option).value
    );
  };

  const getValue = () => {
    if (options) {
      return isMulti
        ? options.filter((option) => field.value.indexOf(option.value) >= 0)
        : options.find((option) => option.value === field.value);
    } else {
      return isMulti ? [] : ('' as any);
    }
  };

  return (
    <>
      <label htmlFor="">{label}</label>
      <Select
        name={field.name}
        value={getValue()}
        onChange={onChange}
        options={options}
        isMulti={isMulti}
        placeholder={placeholder}
      />
    </>
  );
};

export default SelectField;
