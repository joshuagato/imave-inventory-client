import React from 'react';
import './Footer.scss';

const Footer = () => {
  return (
    <div className="footer">
      <h5>Copyright &copy; iMAVE&reg; {new Date().getFullYear()}</h5>
      <p>Powered by FillyCoder</p>
    </div>
  );
};

export default Footer;
