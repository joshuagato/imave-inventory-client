import * as actionTypes from '../actions/action-types';

const initialState = {
  cart: '',
  loading: false,
  failureMessage: ''
};

const reducer = (state = initialState, action) => {
  switch(action.type) {

    case actionTypes.FETCH_NONUSER_SHOPPING_CART_START:
      return { ...state, loading: true };

    case actionTypes.FETCH_NONUSER_SHOPPING_CART_SUCCESS:
      return { ...state, cart: action.cart, loading: false };

    // case actionTypes.FETCH_SHOPPING_CART_SUCCESS_WITH_WARNING:
    //   return { ...state, cart: action.cart, loading: false };
      
    case actionTypes.FETCH_NONUSER_SHOPPING_CART_FAILURE:
      return { ...state, loading: false, failureMessage: action.message };

    default: return state;
  }
};

export default reducer;