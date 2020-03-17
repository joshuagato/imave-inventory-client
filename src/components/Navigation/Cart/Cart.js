import React, { Component } from 'react';
import './Cart.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTimes } from '@fortawesome/free-solid-svg-icons';

class Cart extends Component {
  state = {
    items: [1, 2, 3, 4, 5, 6]
  }

  render() {
    return (
      <div className="cart">
        <div className="cart-heading">
          <h3 className="text-muted text-center">IMAVE CART</h3>
          <h6 className="text-center text-secondary">Products available in your shpping cart.</h6>
          <hr />
        </div>
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
                this.state.items.map(item => (
                  <tr>
                    <td>
                      <span className="img">
                        <img src='https://msf-media.imgix.net/AssetLink/541g6474t4vy2ykq7v4a04m83031b42f.jpg' alt='picas' />
                      </span>
                      <span>Pendrive</span>
                    </td>
                    <td>$10</td><td>3</td><td>$30</td>
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
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    );
  };
};

export default Cart;