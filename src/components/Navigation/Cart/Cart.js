import React, { Component } from 'react';
import './Cart.scss';

class Cart extends Component {
  render() {
    return (
      <div className="cart">
        <div className="cart-heading">
          <h3 className="text-muted text-center">IMAVE CART</h3>
          <h6 className="text-center text-secondary">Products available in your shpping cart.</h6>
          <hr />
        </div>
        <div className="info-section">
          <h3 className="text-center">Under Construction</h3>
        </div>
      </div>
    );
  };
};

export default Cart;