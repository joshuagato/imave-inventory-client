import React, { Component } from 'react';
import './Shop.scss';
// import axios from 'axios';
// import { NavLink } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import FaSpinner from '../../Utilities/FaSpinner/FaSpinner';

export class Shop extends Component {
  constructor(props) {
    super(props);

    this.productIdRef = React.createRef();
    this.productPriceRef = React.createRef();

    this.addToCartHander = event => {
      event.preventDefault();
      
      const productId = event.target.children['productId'].value;
      const productPrice = event.target.children['productPrice'].value;

      const productDetails = {
        productId: productId,
        productPrice: productPrice
      }

      // axios.post();

      console.log(productId, productPrice);
      console.log(productDetails);
    };
  }

  componentDidMount() {
    this.props.onFetchAllProducts();
  }

  render() {
    return (
      <div className="shop">
        <section className="head-section">
          <h3 className="text-success">Shop</h3>
          <h6 className="text-muted">Explore our products</h6>
        </section>
        {this.props.products ?
          <section className="products">
            {
              this.props.products.map(product => (
                <div key={product._id} className="products-list">
                  <div className="upper-div">
                    <img src={`${process.env.REACT_APP_PRODUCT_PICTURES_URL}${product.imageUrl}`} 
                      alt="product_pic" />
                    <span className="product-name">{product.title}</span>
                    <span className="price">${product.price}</span>
                  </div>
                  <div className="lower-div">
                    <small className="text-muted">{product.description}</small>
                    <div className="buttons">
                      <form onSubmit={this.addToCartHander}>
                        <input id="productId" type="hidden" value={product._id} />
                        <input id="productPrice" type="hidden" value={product.price} />
                        <button className="add-to-cart">Add to Cart</button>
                      </form>
                      <button className="buy-now">Buy Now</button>
                    </div>
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
    products: state.productsReducer.products,
    loading: state.productsReducer.loading,
    successMessage: state.productsReducer.successMessage,
    failureMessage: state.productsReducer.failureMessage
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchAllProducts: () => dispatch(actions.fetchProducts())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
