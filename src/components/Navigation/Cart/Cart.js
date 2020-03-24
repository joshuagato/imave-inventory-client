import React, { Component } from 'react';
import './Cart.scss';
import FaSpinner from '../../Utilities/FaSpinner/FaSpinner';
import * as actions from '../../../store/actions/index';

import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';

class Cart extends Component {

  state = {
    axiosHeaders: {
      headers: {
        Authorization: this.props.token
      }
    }
  };

  componentDidMount() {
    this.props.fetchCart();
  };

  decrement = id => {
    
    const productDetails = {
      productId: id
    }

    this.props.decreaseQuantity(productDetails, this.state.axiosHeaders);
  };

  increment = id => {
    
    const productDetails = {
      productId: id
    }

    this.props.increaseQuantity(productDetails, this.state.axiosHeaders);
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

  removeItem = id => {

    const productDetails = {
      productId: id
    }

    this.props.removeCartItem(productDetails, this.state.axiosHeaders);
  };

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
                    <StripeCheckout name="iMave Order Payment" amount={grandTotal * 100}
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);