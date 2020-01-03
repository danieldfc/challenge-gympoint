import React, { useRef, useEffect } from 'react';
import Select from 'react-select/async';

import { useField } from '@rocketseat/unform';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function SelectInput({
  name,
  label,
  options,
  multiple,
  onChange,
  ...rest
}) {
  const ref = useRef();
  const { fieldName, registerField, error } = useField(name);

  function parseSelectValue(selectRef) {
    const selectValue = selectRef.props.value;
    if (!multiple) {
      return selectValue ? selectValue.id : '';
    }

    return selectValue ? selectValue.map(option => option.id) : [];
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.value',
      parseValue: parseSelectValue,
      clearValue: selectRef => {
        selectRef.select.clearValue();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  return (
    <Container>
      {label && <label htmlFor={fieldName}>{label}</label>}

      <Select
        name={fieldName}
        aria-label={fieldName}
        defaultOptions={options}
        isMulti={multiple}
        onChange={onChange}
        ref={ref}
        loadingMessage={() => 'Carregando...'}
        getOptionValue={option => option.id}
        getOptionLabel={option => option.title}
        {...rest}
      />

      {error && <span>{error}</span>}
    </Container>
  );
}

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.oneOfType([PropTypes.array]).isRequired,
  multiple: PropTypes.bool,
  onChange: PropTypes.func,
};

SelectInput.defaultProps = {
  multiple: false,
  onChange: () => {},
};
