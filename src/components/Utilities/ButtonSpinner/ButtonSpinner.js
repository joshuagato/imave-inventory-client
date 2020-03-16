import React from 'react';
import Auxil from '../Auxil/Auxil';
import Spinner from 'react-bootstrap/Spinner';

const ButtonSpinner = props => {
  return (
    <Auxil>
      <span>Loading</span>
      <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
    </Auxil>
  );
};

export default ButtonSpinner;
