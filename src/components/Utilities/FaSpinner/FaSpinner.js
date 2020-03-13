import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const FaSpinner = props => {
  return (
    <div className="m-auto fa-spinner">
      <h1 className="text-center display-3">
        <FontAwesomeIcon icon={faSpinner} spin />
      </h1>
    </div>
  );
};

export default FaSpinner;
