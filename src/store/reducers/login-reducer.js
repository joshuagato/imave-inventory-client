import * as actionTypes from '../actions/action-types';

const initialState = {
  btnDisabled: true,
  loading: false,
  successMessage: '',
  failureMessage: '',
  token: '' || localStorage.getItem('token'),
  userInfo: {
    firstname: '' || localStorage.getItem('firstname'),
    lastname: '' || localStorage.getItem('lastname'),
    email: '' || localStorage.getItem('email')
  }
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.ENABLE_LOGIN:
      return { ...state, btnDisabled: false };

    case actionTypes.DISABLE_LOGIN:
      return { ...state, btnDisabled: true };

    case actionTypes.LOGIN_START:
      return { ...state, loading: true };

    case actionTypes.LOGIN_SUCCESS:
      return { ...state, loading: false, token: action.token, 
        successMessage: action.message, failureMessage: '',
        userInfo: { ...state.userInfo, 
          firstname: action.userInfo.firstname, lastname: action.userInfo.lastname,
          email: action.userInfo.email } };

    case actionTypes.LOGIN_SUCCESS_WITH_WARNING:
      return { ...state, loading: false, successMessage: '', failureMessage: action.message };

    case actionTypes.LOGIN_FAILURE:
      return { ...state, loading: false, failureMessage: action.message, 
          successMessage: '' };

    case actionTypes.LOGOUT:
      return { ...state, loading: false, failureMessage: '', successMessage: '', token: null,
      userInfo: { ...state.userInfo, firstname: null, lastname: null, email: null } };

    default: return state;
  }
}

export default reducer;