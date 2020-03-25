import React, { Component } from 'react';
import './Cart.scss';
import FaSpinner from '../../Utilities/FaSpinner/FaSpinner';
import * as actions from '../../../store/actions/index';

import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

class Cart extends Component {

  state = {
    axiosHeaders: {
      headers: {
        Authorization: this.props.token
      }
    },
    data: {
      nonLoggedInUserId: localStorage.getItem('nonLoggedInUserId')
    }
  };

  componentDidMount() {
    if (this.props.loggedIn) this.props.fetchCart();
    else this.props.nonuserFetchCart(this.state.data);

    if (!this.props.loggedIn) {
      if (!localStorage.getItem('nonLoggedInUserId')) {
        localStorage.setItem('nonLoggedInUserId', uuidv4());

        const data = {
          nonLoggedInUserId: localStorage.getItem('nonLoggedInUserId')
        };
  
        axios.post(process.env.REACT_APP_NONUSER_CREATE_SHOPPING_CART_URL, data);
      }
    }
  };

  decrement = id => {
    const productDetails = {
      productId: id
    }

    const data = {
      nonLoggedInUserId: localStorage.getItem('nonLoggedInUserId'),
      productId: id
    };

    if (this.props.loggedIn) this.props.decreaseQuantity(productDetails, this.state.axiosHeaders);
    else this.props.nonuserDecreaseItemQuantity(data)
  };

  increment = id => {
    const productDetails = {
      productId: id
    }

    const data = {
      nonLoggedInUserId: localStorage.getItem('nonLoggedInUserId'),
      productId: id
    };

    if (this.props.loggedIn) this.props.increaseQuantity(productDetails, this.state.axiosHeaders);
    else this.props.nonuserIncreaseItemQuantity(data)
  };

  removeItem = id => {
    const productDetails = {
      productId: id
    }

    const data = {
      nonLoggedInUserId: localStorage.getItem('nonLoggedInUserId'),
      productId: id
    };

    if (this.props.loggedIn) this.props.removeCartItem(productDetails, this.state.axiosHeaders);
    else this.props.nonuserRemoveCartItem(data);
  };

  onToken = token => {
    const body = {
      token,
      // product
    };

    const data = {
      method: 'post',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    }

    return fetch(process.env.REACT_APP_STRIPE_PAYMENT_STRAIGHT_PURCHASE_URL, data)
    .then(response => {
      const { status } = response;
      console.log('Status', status);
      console.log('Response', response);

      return response.json();
    })
    .then(result => console.log('Result', result))
    .catch(error => console.log(error));
  }

  render() {
    const { cart } = this.props;
    let subTotal;
    const grandTotal = +cart.grandTotalPrice

    return (
      <div className="cart">
        <div className="cart-heading">
          <h3 className="text-success">Cart</h3>
          <h6 className="text-secondary">Products in your shpping cart</h6>
          <hr />
        </div>
        {cart.items ?
          <React.Fragment>
            {(cart.items.length > 0) || (cart.grandTotalPrice > 0) ?
              <section className="yes-items">
                <div className="info-section">
                  <table>
                    <thead>
                      <tr>
                        <th>Product</th><th>Unit price</th><th>Quantity</th><th>Sub-total</th>
                        <th><span>ADD</span><span>SUB</span><span>DEL</span></th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        cart.items.map(item => {
                          
                          subTotal = +item.subTotalPrice

                          return (
                            <tr key={item._id}>
                              <td>
                                <span className="img">
                                  <img src={`${process.env.REACT_APP_PRODUCT_PICTURES_URL}${item.imageUrl}`} alt={item.title} />
                                </span>
                                <span className="title">{item.title}</span>
                              </td>
                              <td className="unit-price">${item.unitPrice}</td><td>{item.quantity}</td>
                              <td>${subTotal.toFixed(2)}</td>
                              <td>
                                <button onClick={this.decrement.bind(this, item.productId)} className="decrease">
                                  <FontAwesomeIcon icon={faMinus} />
                                </button>
                                <button onClick={() => this.increment(item.productId)} className="increase">
                                  <FontAwesomeIcon icon={faPlus} />
                                </button>
                                <button onClick={id => this.removeItem(item.productId)} className="remove">
                                  <FontAwesomeIcon icon={faTimes} />
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      }
                    </tbody>
                  </table>
                  <section className="final-div">
                    <span className="grand-total">Grand: ${grandTotal.toFixed(2)}</span>
                    <NavLink to='/'>Continue Shopping</NavLink>
                    <StripeCheckout name="iMave Order Payment" amount={grandTotal.toFixed(2) * 100}
                      stripeKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY} currency="USD"
                      token={this.onToken} shippingAddress billingAddress zipCode />
                  </section>
                </div>
              </section>
            :
              <section className="text-muted no-item">
                <h3>No Items in your cart yet. Please add some items.</h3>
              </section>
            }
          </React.Fragment>
        :
          <FaSpinner />
        }
      </div>
    );
  };
};

const mapStateToProps = state => {
  return {
    loggedIn: state.loginReducer.userInfo.firstname !== null && 
      state.loginReducer.userInfo.lastname !== null &&
      state.loginReducer.token !== null,
    token: state.loginReducer.token,
    cart: state.cartReducer.cart,
    loading: state.cartReducer.loading,
    failureMessage: state.cartReducer.failureMessage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCart: () => dispatch(actions.fetchCart()),
    increaseQuantity: (productDetails, axiosHeaders) => dispatch(actions.increaseItemQuantity(productDetails, axiosHeaders)),
    decreaseQuantity: (productDetails, axiosHeaders) => dispatch(actions.decreaseItemQuantity(productDetails, axiosHeaders)),
    removeCartItem: (productDetails, axiosHeaders) => dispatch(actions.removeCartItem(productDetails, axiosHeaders)),
    clearCart: axiosHeaders => dispatch(actions.clearCart(axiosHeaders)),
    nonuserFetchCart: data => dispatch(actions.nonuserFetchCart(data)),
    nonuserIncreaseItemQuantity: data => dispatch(actions.nonuserIncreaseItemQuantity(data)),
    nonuserDecreaseItemQuantity: data => dispatch(actions.nonuserDecreaseItemQuantity(data)),
    nonuserRemoveCartItem: data => dispatch(actions.nonuserRemoveCartItem(data)),
    nonuserClearCart: data => dispatch(actions.nonuserClearCart(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);