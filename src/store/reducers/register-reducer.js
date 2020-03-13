import * as actionTypes from '../actions/action-types';

const initialState = {
  btnDisabled: true,
  loading: false,
  successMessage: '',
  failureMessage: ''
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.ENABLE_REGISTER_USER:
      return { ...state, btnDisabled: false };

    case actionTypes.DISABLE_REGISTER_USER:
      return { ...state, btnDisabled: true };

    case actionTypes.REGISTER_USER_START:
      return { ...state, loading: true };

    case actionTypes.REGISTER_USER_SUCCESS:
      return { ...state, loading: false, successMessage: action.message, failureMessage: '' };

    case actionTypes.REGISTER_USER_SUCCESS_WITH_WARNING:
      return { ...state, loading: false, successMessage: '', failureMessage: action.message };

    case actionTypes.REGISTER_USER_FAILURE:
      return { ...state, loading: false, successMessage: '', failureMessage: action.message };

    case actionTypes.LOGOUT:
      return { ...state, loading: false, failureMessage: '', successMessage: '', btnDisabled: true };
        
    default: return state;
  }
}

export default reducer;