import React, { Component } from 'react';
import './ContactUs.scss';

export class ContactUs extends Component {
  render() {
    return (
      <div className="contact-us">
        <form>
          <div className="heading">
            <h3 className="text-muted text-center">CONTACT US</h3>
            <h6 className="text-center text-secondary">Drop us a message.</h6>
          </div>
          <div className="form-group">
            <label htmlFor="fullname">Fullname</label>
            <input id="fullname" type="text" name="fullname" onChange={this.inputHandler}
              placeholder="Your Fullname" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" name="email" onChange={this.inputHandler}
              placeholder="Your email address" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input id="phone" type="text" name="phone" onChange={this.inputHandler}
              placeholder="Your phone number" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" type="text" name="message" onChange={this.inputHandler}
              placeholder="Your message." className="form-control" rows="4"></textarea>
          </div>
          <div className="form-group">
            <button>Submit Message</button>
          </div>
        </form>
      </div>
    );
  };
};

export default ContactUs;
