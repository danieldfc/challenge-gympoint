import React from 'react';

import PropTypes from 'prop-types';

import { ContainerButton } from './styles';

export default function Button({ type, onClick, children, ...rest }) {
  return (
    <ContainerButton type={type} onClick={onClick} {...rest}>
      {children}
    </ContainerButton>
  );
}

Button.propTypes = {
  type: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  onClick: () => {},
};
