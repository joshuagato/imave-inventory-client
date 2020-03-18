import React, { Component } from 'react';
import './Cart.scss';
import FaSpinner from '../../Utilities/FaSpinner/FaSpinner';

import axios from 'axios';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

class Cart extends Component {
  state = {
    items: [1, 2, 3, 4],
    cart: '',
    failureMessage: ''
  }

  componentDidMount() {
    const axiosHeaders = {
      headers: {
      Authorization: this.props.token
      }
    }

    axios.get(process.env.REACT_APP_FETCH_SHOPPING_CART_URL, axiosHeaders)
    .then(response => this.setState({ cart: response.data.cart }))
    .catch(error => {
      if (error.response) this.setState({ failureMessage: error.response.data.message });
    });
  }

  componentDidUpdate() {
    console.log(this.state.cart);
  }

  render() {
    const { cart } = this.state;
    const grandTotal = +cart.grandTotalPrice

    return (
      <div className="cart">
        <div className="cart-heading">
          <h3 className="text-success">Cart</h3>
          <h6 className="text-secondary">Products in your shpping cart</h6>
          <hr />
        </div>
        {cart.items ?
          <div className="info-section">
            <table>
              <thead>
                  <tr>
                    <th>Product</th><th>Unit price</th><th>Quantity</th><th>Sub-total</th>
                    <th><span>ADD</span><span>SUB</span><span>DEL</span></th>
                  </tr>
              </thead>
              <tbody>
                {cart ?
                  cart.items.map(item => (
                    <tr key={item._id}>
                      <td>
                        <span className="img">
                          <img src={`${process.env.REACT_APP_PRODUCT_PICTURES_URL}${item.imageUrl}`} alt={item.title} />
                        </span>
                        <span>{item.title}</span>
                      </td>
                      <td>${item.unitPrice}</td><td>{item.quantity}</td><td>${item.subTotalPrice}</td>
                      <td>
                        <button className="decrease">
                          <FontAwesomeIcon icon={faMinus} />
                        </button>
                        <button className="increase">
                          <FontAwesomeIcon icon={faPlus} />
                        </button>
                        <button className="remove">
                          <FontAwesomeIcon icon={faTimes} />
                        </button>
                      </td>
                    </tr>
                  )):
                  null
                }
              </tbody>
            </table>
            <section className="final-div">
              <span className="grand-total">Grand Total: ${grandTotal.toFixed(2)}</span>
              <NavLink to='/cart'>Continue Shopping</NavLink>
              <NavLink to='/cart'>Proceed to Checkout</NavLink>
            </section>
          </div> :
          <FaSpinner />
        }
      </div>
    );
  };
};

const mapStateToProps = state => {
  return {
    token: state.loginReducer.token
  };
};

export default connect(mapStateToProps)(Cart);