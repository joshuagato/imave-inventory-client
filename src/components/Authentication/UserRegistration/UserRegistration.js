import React, { Component } from 'react';
import './UserRegistration.scss';
import ReactstrapAlert from '../../Utilities/ReactstrapAlert/ReactstrapAlert';
import * as actions from '../../../store/actions/index';
import Auxil from '../../Utilities/Auxil/Auxil';
import ButtonSpinner from '../../Utilities/ButtonSpinner/ButtonSpinner';

import { Redirect } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

class UserRegistration extends Component {

  state = {
    userInput: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      password2: ''
    }
  }

  inputHandler = event => {

    const updatedUserInput = { ...this.state.userInput };
    updatedUserInput[event.target.name] = event.target.value

    this.setState({ userInput: updatedUserInput });
  }

  registerUser = event => {
    event.preventDefault();

    this.props.onRegisterUser(this.state.userInput);
  };

  componentDidMount() {
    this.props.disableRegisterButton();
  }

  componentDidUpdate() {
    const input = this.state.userInput;

    if(input.firstname && input.lastname && input.email && input.password && input.password2)
      this.props.enableRegisterButton();

    else this.props.disableRegisterButton();

    if (this.props.successMessage && !this.props.btnDisabled) {
      const updatedUserInput = { ...this.state.userInput };
      updatedUserInput['firstname'] = '';
      updatedUserInput['lastname'] = '';
      updatedUserInput['email'] = '';
      updatedUserInput['password'] = '';
      updatedUserInput['password2'] = '';

      this.setState({ userInput: updatedUserInput });
    }
  }

  render() {
    const userInput = this.state.userInput;
    const props = this.props;

    let redirectPage;
    if (this.props.loggedIn) redirectPage = <Redirect to='/' />

    return (
      <Auxil>
        { redirectPage }

        <div className="user-registration">
          <form onSubmit={this.registerUser}>
            <div className="heading">
              <h3 className="text-muted text-center">REGISTER</h3>
              <h6 className="text-center text-secondary">Create a new account.</h6>
              {
                props.successMessage || props.failureMessage ?
                  <ReactstrapAlert failureMessage={props.failureMessage}
                    successMessage={props.successMessage} />
                    :
                  null
              }
            </div>
            <div className="form-group">
              <input id="fname" type="text" name="firstname" onChange={this.inputHandler}
                placeholder="Your Firstname" value={userInput.firstname} />
              <label htmlFor="fname">Firstname</label>
            </div>
            <div className="form-group">
              <input id="lname" type="text" name="lastname" onChange={this.inputHandler}
                placeholder="Your Lastname" value={userInput.lastname} />
              <label htmlFor="lname">Lastname</label>
            </div>
            <div className="form-group">
              <input id="email" type="email" name="email" onChange={this.inputHandler}
                placeholder="Your email address" value={userInput.email} />
              <label htmlFor="email">Email</label>
            </div>
            <div className="form-group">
              <input id="password" type="password" name="password" onChange={this.inputHandler}
                placeholder="Your password" value={userInput.password} />
              <label htmlFor="password">Password</label>
            </div>
            <div className="form-group">
              <input id="password2" type="password" name="password2" onChange={this.inputHandler}
                placeholder="Enter your password again" value={userInput.password2} />
              <label htmlFor="password2">Confirm Password</label>
            </div>
            <div className="form-group">
              <button disabled={props.btnDisabled}>
                { this.props.loading ? <ButtonSpinner /> : "Register" }
              </button>
            </div>
            <div className="form-group">
              <p className="text-muted text-center text-display">Already Registered?
                <NavLink to="/login"> Login Here.</NavLink>
              </p>
            </div>
          </form>
        </div>
      </Auxil>
    );
  };
};

const mapStateToProps = state => {
  return {
    loggedIn: state.loginReducer.userInfo.firstname !== null && 
      state.loginReducer.userInfo.lastname !== null &&
      state.loginReducer.token !== null,
    btnDisabled: state.registerReducer.btnDisabled,
    loading:  state.registerReducer.loading,
    successMessage:  state.registerReducer.successMessage,
    failureMessage:  state.registerReducer.failureMessage
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onRegisterUser: (input) => dispatch(actions.register(input)),
    enableRegisterButton: () => dispatch(actions.enableRegisterButton()),
    disableRegisterButton: () => dispatch(actions.disableRegisterButton())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRegistration);
