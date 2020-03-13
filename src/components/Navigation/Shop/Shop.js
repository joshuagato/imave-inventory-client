import React, { Component } from 'react';
import './Shop.scss';

import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import FaSpinner from '../../Utilities/FaSpinner/FaSpinner';

export class Shop extends Component {

  state = {
    products: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    data: {}
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
                    <img src={`${process.env.REACT_APP_PRODUCT_PICTURES_URL}${product.productPicture}`} 
                      alt="product_pic" />
                    <span className="product-name">{product.title}</span>
                    <span className="price">${product.price}</span>
                  </div>
                  <div className="lower-div">
                    <small className="text-muted">{product.description}</small>
                    <div className="buttons">
                      <button className="add-to-cart">Add to Cart</button>
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
