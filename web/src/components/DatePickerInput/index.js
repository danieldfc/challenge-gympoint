import React, { useRef, useEffect, useState } from 'react';
import ReactDatePicker, { setDefaultLocale } from 'react-datepicker';

import { useField } from '@rocketseat/unform';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';

import { Container } from './styles';

import 'react-datepicker/dist/react-datepicker.css';

setDefaultLocale(pt);

export default function DatePickerInput({
  name,
  label,
  disabled,
  onChange,
  value,
  ...rest
}) {
  const ref = useRef();
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [selected, setSelected] = useState(defaultValue);

  useEffect(() => {
    if (!value || value !== 'Invalid Date') {
      setSelected(value);
    }
  }, [value]);

  useEffect(() => {
    setSelected(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.selected',
      clearValue: pickerRef => {
        pickerRef.clear();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  return (
    <Container>
      <label htmlFor={fieldName}>
        {label}
        <ReactDatePicker
          id={fieldName}
          autoComplete="off"
          disabled={disabled}
          name={fieldName}
          selected={selected}
          onChange={date => {
            setSelected(date);
            onChange(date);
          }}
          ref={ref}
          {...rest}
        />
      </label>
      {error && <span>{error}</span>}
    </Container>
  );
}

DatePickerInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.any, // eslint-disable-line
};

DatePickerInput.defaultProps = {
  label: '',
  disabled: false,
  onChange: () => {},
  value: null,
};
