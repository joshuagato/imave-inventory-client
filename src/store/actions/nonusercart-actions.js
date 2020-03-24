import * as actionTypes from './action-types';
import axios from 'axios';

const fetchCartStart = () => {
  return {
    type: actionTypes.FETCH_NONUSER_SHOPPING_CART_START
  };
};

const fetchCartSuccess = cart => {
  return {
    type: actionTypes.FETCH_NONUSER_SHOPPING_CART_SUCCESS,
    cart: cart
  };
};

const fetchCartFailure = message => {
  return {
    type: actionTypes.FETCH_NONUSER_SHOPPING_CART_FAILURE,
    message: message
  };
};

// todo: work on the successWithWarning Actions
export const nonuserFetchCart = data => {
  return dispatch => {
    dispatch(fetchCartStart());

    axios.post(process.env.REACT_APP_NONUSER_FETCH_SHOPPING_CART_URL, data)
    .then(response => dispatch(fetchCartSuccess(response.data.cart)))
    .catch(error => {
      if (error.response) dispatch(fetchCartFailure(error.response.data.message));
    });
  };
};

export const nonuserAddToCart = data => {
  return dispatch => {
    axios.post(process.env.REACT_APP_NONUSER_SHOPPING_CART_ADD_ITEM_URL, data)
    .then(response => dispatch(nonuserFetchCart(data)))
    .catch(error => dispatch(nonuserFetchCart(data)));
  };
};

export const nonuserIncreaseItemQuantity = data => {
  return dispatch => {
    axios.post(process.env.REACT_APP_NONUSER_SHOPPING_CART_INCREASE_QUANTITY_URL, data)
    .then(response => dispatch(nonuserFetchCart(data)))
    .catch(error => dispatch(nonuserFetchCart(data)));
  };
};

export const nonuserDecreaseItemQuantity = data => {
  return dispatch => {
    axios.post(process.env.REACT_APP_NONUSER_SHOPPING_CART_DECREASE_QUANTITY_URL, data)
    .then(response => dispatch(nonuserFetchCart(data)))
    .catch(error => dispatch(nonuserFetchCart(data)));
  };
};

export const nonuserRemoveCartItem = data => {
  return dispatch => {
    axios.post(process.env.REACT_APP_NONUSER_SHOPPING_CART_REMOVE_ITEM_URL, data)
    .then(response => dispatch(nonuserFetchCart(data)))
    .catch(error => dispatch(nonuserFetchCart(data)));
  };
};

export const nonuserClearCart = data => {
  return dispatch => {
    axios.post(process.env.REACT_APP_NONUSER_CLEAR_SHOPPING_CART_URL, data)
    .then(response => dispatch(nonuserFetchCart(data)))
    .catch(error => dispatch(nonuserFetchCart(data)));
  };
};