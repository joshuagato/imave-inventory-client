import React from 'react';
import { Alert } from 'reactstrap';

const ReactstrapAlert = props => {
  return (
    <Alert color={props.successMessage ? 'success' : 'danger'}>
      {props.successMessage || props.failureMessage}
    </Alert>
  );
};

export default ReactstrapAlert;
