import React from 'react';
import './App.scss';
import { Switch, Route } from 'react-router-dom';

import UserRegistration from './components/Authentication/UserRegistration/UserRegistration';
import Login from './components/Authentication/Login/Login';
import ContactUs from './components/Navigation/ContactUs/ContactUs';
import Cart from './components/Navigation/Cart/Cart';
import AboutUs from './components/Navigation/AboutUs/AboutUs';
import Shop from './components/Navigation/Shop/Shop';
import Profile from './components/Navigation/Profile/Profile';
import Logout from './components/Authentication/Logout/Logout';
import Error404 from './components/Utilities/Error404/Error404';
import Footer from './components/Footer/Footer';
import NavBar from './components/Navigation/NavBar/NavBar';
// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';

// const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

function App() {
  return (
    // <Elements stripe={stripePromise}>
      <div className="App">
        <NavBar />
          <Switch>
            <Route path="/register" exact component={UserRegistration} />
            <Route path="/login" exact component={Login} />
            <Route path="/cart" exact component={Cart} />
            <Route path="/contact-us" exact component={ContactUs} />
            <Route path="/about-us" exact component={AboutUs} />
            <Route path="/profile" exact component={Profile} />
            <Route path="/logout" exact component={Logout} />
            <Route path="/" exact component={Shop} />
            <Route component={Error404} />
          </Switch>
        <Footer />
      </div>
    // </Elements>
  );
};

export default App;
