import React, { Component } from 'react';
import './AboutUs.scss';

class AboutUs extends Component {
  render() {
    return (
      <div className="about-us">
        <div className="about-us-heading">
          <h3 className="text-muted text-center">IMAVE HAIR PRODUCTS!</h3>
          <h6 className="text-center text-secondary">Know More About Us.</h6>
          <hr />
        </div>
        <div className="info-section">
          <p className="text-justify">
            Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut 
            labore etae magna aliqua. Ut enim ad minim veniam, quis nostrud 
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum 
            dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non 
            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <img alt="cometic" 
            src="https://brandmarketingblog.com/wp-content/uploads/2019/03/white-label-cosmetic-bottles.jpg" />
        </div>
      </div>
    );
  };
};

export default AboutUs;
