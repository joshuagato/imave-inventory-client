import React from 'react';
import './QuickView.scss';

const QuickView = props => {
  const { id, product } = props;
  return (
    <div className="quick-view-div">
      <input type='checkbox' id={id} className='show-hide-modal' />
      <div className='modal-wrapper'>
        <div className='modalbox'>
          <div className='modal-header'>
            <label htmlFor={id} className='btn-close' title='Close'>X</label>
          </div>
          <div className='modal-content-body'>
            <section className='top-section'>
              <div className='img-div'>
                <img src={`${process.env.REACT_APP_PRODUCT_PICTURES_URL}${product.imageUrl}`}
                  alt={product.name} className="img-fluid img-thumbnail" />
              </div>
              <div className='details-div'>
                <h5 className='text-muted'>{product.title}</h5>
                <p>${product.price}</p>
              </div>
            </section>
            <section className='bottom-section text-muted'>
              <p>{product.description}</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickView;
