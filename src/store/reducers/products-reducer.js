import * as actionTypes from '../actions/action-types';

const initialState = {
  products: '',
  loading: false,
  successMessage: '',
  failureMessage: ''
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.FETCH_PRODUCTS_START:
      return { ...state, loading: true, successMessage: '', failureMessage: '' };

    case actionTypes.FETCH_PRODUCTS_SUCCESS:
      return { 
        ...state, loading: false, successMessage: '', failureMessage: '', 
        products: action.products
      };

    case actionTypes.FETCH_PRODUCTS_SUCCESS_WITH_WARNING:
      return { ...state, loading: false, successMessage: '', failureMessage: action.message };

    case actionTypes.FETCH_PRODUCTS_FAILURE:
      return { ...state, loading: false, successMessage: '', failureMessage: action.message };

    default: return state;
  }
};

export default reducer;