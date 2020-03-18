import * as actionTypes from './action-types';
import axios from 'axios';

const fetchProductsStart = () => {
  return {
    type: actionTypes.FETCH_PRODUCTS_START
  }
}

const fetchProductsSuccess = products => {
  return {
    type: actionTypes.FETCH_PRODUCTS_SUCCESS,
    products: products
  }
}

const fetchProductsSuccessWithWarning = message => {
  return {
    type: actionTypes.FETCH_PRODUCTS_SUCCESS_WITH_WARNING,
    message: message
  }
}

const fetchProductsFailure = message => {
  return {
    type: actionTypes.FETCH_PRODUCTS_FAILURE,
    message: message
  }
}

export const fetchProducts = () => {
  return dispatch => {
    dispatch(fetchProductsStart());
    
    axios.get(process.env.REACT_APP_RETRIEVE_ALL_PRODUCTS_URL).then(response => {
      if (response.data.success) dispatch(fetchProductsSuccess(response.data.products));
      else dispatch(fetchProductsSuccessWithWarning(response.data.message));
    })
    .catch(error => dispatch(fetchProductsFailure(error.response.data.message)));
  };
};