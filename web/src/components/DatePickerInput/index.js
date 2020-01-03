import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

import PropTypes from 'prop-types';

export default function DatePickerInput({
  name,
  dateFormat,
  selected,
  ...rest
}) {
  return (
    <DatePicker
      name={name}
      dateFormat={dateFormat}
      selected={selected}
      {...rest}
    />
  );
}

DatePickerInput.propTypes = {
  name: PropTypes.string.isRequired,
  dateFormat: PropTypes.string.isRequired,
  selected: PropTypes.string.isRequired,
};
