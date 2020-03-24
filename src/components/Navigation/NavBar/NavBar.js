import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import Auxil from '../../../components/Utilities/Auxil/Auxil';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';

class NavBar extends Component {

  render() {
    const props = this.props;
    const userInfo = this.props.userInfo;

    return (
      <Auxil>
        <Navbar sticky="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand><NavLink to="/">iMAVE</NavLink></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              {/* <Nav.Link href="#features">Features</Nav.Link> */}
              {/* <Nav.Link href="#pricing">Pricing</Nav.Link> */}
            </Nav>
            <Nav>
              {
                props.loggedIn ?
                  <NavLink className="nav-link" role="button" to="/profile">
                    <FontAwesomeIcon icon={faUser} /> {userInfo.firstname}
                  </NavLink>
                :
                <NavLink className="nav-link" role="button" to="/register">Login/Register</NavLink>
              }
              <NavLink className="nav-link" role="button" to="/cart">
                <FontAwesomeIcon icon={faShoppingCart} /> Cart
              </NavLink>
              <NavLink className="nav-link" role="button" to="/contact-us">Contact Us</NavLink>
              <NavLink className="nav-link" role="button" to="/about-us">About Us</NavLink>
              <NavLink className="nav-link" role="button" to="/">Shop</NavLink>
              {
                props.loggedIn ?
                  <NavLink className="nav-link" role="button" to="/logout">Logout</NavLink>
                  : null
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Auxil>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.loginReducer.userInfo.firstname !== null && 
      state.loginReducer.userInfo.lastname !== null &&
      state.loginReducer.token !== null,
    userInfo: state.loginReducer.userInfo,
    token: state.loginReducer.token
  };
}

export default connect(mapStateToProps)(NavBar);
