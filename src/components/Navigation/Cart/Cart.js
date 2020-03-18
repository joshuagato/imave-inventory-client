import React, { Component } from 'react';
import './Cart.scss';
import FaSpinner from '../../Utilities/FaSpinner/FaSpinner';
import * as actions from '../../../store/actions/index';

import axios from 'axios';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

class Cart extends Component {

  componentDidMount() {
    
    this.props.fetchCart();
  };

  componentDidUpdate() {
    
  }

  decrement = () => {
    axios.get(process.env.REACT_APP_SHOPPING_CART_DECREASE_QUANTITY_URL, this.axiosHeaders)
    .then(response => this.setState({ cart: response.data.cart }))
    .catch(error => {
      if (error.response) this.setState({ failureMessage: error.response.data.message });
    });
  };

  increment = () => {
    axios.get(process.env.REACT_APP_SHOPPING_CART_INCREASE_QUANTITY_URL, this.axiosHeaders)
    .then(response => this.setState({ cart: response.data.cart }))
    .catch(error => {
      if (error.response) this.setState({ failureMessage: error.response.data.message });
    });
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
                                <button onClick={this.decrement} className="decrease">
                                  <FontAwesomeIcon icon={faMinus} />
                                </button>
                                <button onClick={this.increment} className="increase">
                                  <FontAwesomeIcon icon={faPlus} />
                                </button>
                                <button onClick={this.remove} className="remove">
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
                    <span className="grand-total">Grand Total: ${grandTotal.toFixed(2)}</span>
                    <NavLink to='/cart'>Continue Shopping</NavLink>
                    <NavLink to='/cart'>Proceed to Checkout</NavLink>
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
    fetchCart: (axiosHeaders) => dispatch(actions.fetchCart(axiosHeaders)) 
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);