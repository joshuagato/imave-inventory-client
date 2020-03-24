import React, { Component } from 'react';
import './Shop.scss';

import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import FaSpinner from '../../Utilities/FaSpinner/FaSpinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import StripeCheckout from 'react-stripe-checkout';
// import { CardElement } from '@stripe/react-stripe-js';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

export class Shop extends Component {

  addToCartHander = event => {
    event.preventDefault();
    
    const productId = event.target.children['productId'].value;

    const productDetails = {
      productId: productId
    }

    const axiosHeaders = {
      headers: {
        Authorization: this.props.token
      }
    }

    const data = {
      nonLoggedInUserId: localStorage.getItem('nonLoggedInUserId'),
      productId: productId
    };

    if (this.props.loggedIn) this.props.addToCart(productDetails, axiosHeaders);
    else this.props.nonuserAddToCart(data);

    this.props.history.push('/cart');
  };

  makePayment = (product, token) => {
    const body = {
      token,
      product
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
  };

  componentDidMount() {
    this.props.onFetchAllProducts();

    if (!this.props.loggedIn) {
      if (!localStorage.getItem('nonLoggedInUserId')) {
        localStorage.setItem('nonLoggedInUserId', uuidv4());

        const data = {
          nonLoggedInUserId: localStorage.getItem('nonLoggedInUserId')
        };
  
        axios.post(process.env.REACT_APP_NONUSER_CREATE_SHOPPING_CART_URL, data);
      }
    }
  }

  render() {
    return (
      <div className="shop">
        <section className="head-section">
          <h3 className="text-success">Shop</h3>
          <h6 className="text-muted">Explore our products</h6>
          <hr />
        </section>
        {this.props.products ?
          <section className="products">
            {
              this.props.products.map(product => (
                <div key={product._id} className="products-list">
                  <div className="upper-div">
                    <img src={`${process.env.REACT_APP_PRODUCT_PICTURES_URL}${product.imageUrl}`} 
                      alt="product_pic" />
                    <section>
                      <span className="product-name">{product.title}</span>
                      <span className="price">${product.price}</span>
                    </section>
                    <section>
                      <form onSubmit={this.addToCartHander}>
                        <input id="productId" type="hidden" value={product._id} />
                        <input id="productPrice" type="hidden" value={product.price} />
                        <button className="add-to-cart" title="Add to Cart">
                          <FontAwesomeIcon icon={faShoppingCart} />
                        </button>
                      </form>
                        <StripeCheckout className="buy-now" label={`Buy @ $${product.price}`}
                          name="iMave Order Payment" amount={product.price * 100}
                          stripeKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY} currency="USD"
                          token={this.makePayment.bind(this, product)} shippingAddress
                          billingAddress zipCode panelLabel={`Pay iMave`} />
                      {/* <form onSubmit={this.handleSubmit}>
                        <label className="buy-now">
                          Card details
                          <CardElement options={CARD_ELEMENT_OPTIONS} />
                        </label>
                      </form> */}
                    </section>
                  </div>
                  <div className="lower-div">
                    <small className="text-muted">{product.description}</small>
                  </div>
                </div>
              ))
            }
          </section>
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
    products: state.productsReducer.products,
    loading: state.productsReducer.loading,
    successMessage: state.productsReducer.successMessage,
    failureMessage: state.productsReducer.failureMessage
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchAllProducts: () => dispatch(actions.fetchProducts()),
    addToCart: (productDetails, axiosHeaders) => dispatch(actions.addToCart(productDetails, axiosHeaders)),
    nonuserAddToCart: data => dispatch(actions.nonuserAddToCart(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
