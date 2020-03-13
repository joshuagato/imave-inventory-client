import * as actionTypes from './action-types';
import axios from 'axios';


// Actions for enabling/disabling the register button
export const enableRegisterButton = () => {
  return {
    type: actionTypes.ENABLE_REGISTER_USER
  };
}

export const disableRegisterButton = () => {
  return {
    type: actionTypes.DISABLE_REGISTER_USER
  };
}
// End of Actions for enabling/disabling the register button


// Actions for Registration
const registrationStart = () => {
  return {
    type: actionTypes.REGISTER_USER_START
  };
}

const registrationSuccess = message => {
  return {
    type: actionTypes.REGISTER_USER_SUCCESS,
    message: message
  };
}

const registrationSuccessWithWarning = message => {
  return {
    type: actionTypes.REGISTER_USER_SUCCESS_WITH_WARNING,
    message: message
  };
}


const registrationFailure = message => {
  return {
    type: actionTypes.REGISTER_USER_FAILURE,
    message: message
  };
}

export const register = userInput => {
  return dispatch => {
    dispatch(registrationStart());

    axios.post(process.env.REACT_APP_USER_REGISTER_URL, userInput).then(response => {
      const message = response.data.message;
      const success = response.data.success;

      success ? dispatch(registrationSuccess(message)) : dispatch(registrationSuccessWithWarning(message));
    })
    .catch(error => {
      dispatch(registrationFailure(error.response.data.message));
    });
  };
}
// End of Actions for Registration