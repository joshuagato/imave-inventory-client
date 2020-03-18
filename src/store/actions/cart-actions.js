import * as actionTypes from './action-types';
import axios from 'axios';

const fetchCartStart = () => {
  return {
    type: actionTypes.FETCH_SHOPPING_CART_START
  };
};

const fetchCartSuccess = cart => {
  return {
    type: actionTypes.FETCH_SHOPPING_CART_SUCCESS,
    cart: cart
  };
};

const fetchCartFailure = message => {
  return {
    type: actionTypes.FETCH_SHOPPING_CART_FAILURE,
    message: message
  };
};

// todo: work on the successWithWarning Actions
export const fetchCart = () => {
  return (dispatch, getState) => {
    
    const { token } = getState().loginReducer;

    const axiosHeaders = {
      headers: {
        Authorization: token
      }
    }

    dispatch(fetchCartStart());

    axios.get(process.env.REACT_APP_FETCH_SHOPPING_CART_URL, axiosHeaders)
    .then(response => dispatch(fetchCartSuccess(response.data.cart)))
    .catch(error => {
      if (error.response) dispatch(fetchCartFailure(error.response.data.message));
    });
  };
}

export const addToCart = (productDetails, axiosHeaders) => {
  return dispatch => {
    axios.post(process.env.REACT_APP_SHOPPING_CART_ADD_ITEM_URL, productDetails, axiosHeaders)
      .then(response => dispatch(fetchCart()))
      .catch(error => dispatch(fetchCart()));
  }
}