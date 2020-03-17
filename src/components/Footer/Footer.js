import React from 'react';
import './Footer.scss';

const Footer = () => {
  return (
    <div className="footer">
      <h5>iMAVE &copy; {new Date().getFullYear()}</h5>
      <p>Powered by FillyCoder</p>
    </div>
  );
};

export default Footer;
