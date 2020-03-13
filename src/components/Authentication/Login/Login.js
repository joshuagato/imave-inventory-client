import React, { Component } from 'react';
import './Login.scss';
import ReactstrapAlert from '../../Utilities/ReactstrapAlert/ReactstrapAlert';
import Auxil from '../../Utilities/Auxil/Auxil';

import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import { NavLink } from 'react-router-dom';

class Login extends Component {
  state = {
    userInput: {
      email: '',
      password: ''
    }
  }

  inputHandler = event => {
    const updatedUserInput = { ...this.state.userInput };
    updatedUserInput[event.target.name] = event.target.value

    this.setState({ userInput: updatedUserInput });
  }

  loginUser = event => {
    event.preventDefault();

    this.props.onLogin(this.state.userInput);
  };

  componentDidMount() {
    this.props.disableLoginButton();
  }

  componentDidUpdate() {
    const input = this.state.userInput;

    if(input.email && input.password)
      this.props.enableLoginButton();

    else this.props.disableLoginButton();

    if (this.props.successMessage && !this.props.btnDisabled) {
      const updatedUserInput = { ...this.state.userInput };

      updatedUserInput['email'] = '';
      updatedUserInput['password'] = '';

      this.setState({ userInput: updatedUserInput });
    }
  }

  render() {
    const props = this.props;
    const input = this.state.userInput;

    let redirectPage;
    if (this.props.loggedIn) redirectPage = <Redirect to='/' />
    
    return (
      <Auxil>
        { redirectPage }
        
        <div className="user-login">
          <form onSubmit={this.loginUser}>
            <div className="heading">
              <h3 className="text-muted text-center">LOGIN</h3>
              <h6 className="text-center text-secondary">Access your account.</h6>
              {
                props.successMessage || props.failureMessage ?
                  <ReactstrapAlert failureMessage={props.failureMessage}
                    successMessage={props.successMessage} />
                    :
                  null
              }
            </div>
            <div className="form-group">
              <input id="email" type="email" name="email" onChange={this.inputHandler}
                placeholder="Your email address" value={input.email} />
              <label htmlFor="email">Email</label>
            </div>
            <div className="form-group">
              <input id="password" type="password" name="password" onChange={this.inputHandler}
                placeholder="Your password" value={input.password} />
              <label htmlFor="password">Password</label>
            </div>
            <div className="form-group">
              <button disabled={props.btnDisabled}>Login</button>
            </div>
            <div className="form-group">
              <p className="text-muted text-center text-display">Don't have an account yet?
                <NavLink to="/register"> Register Here.</NavLink>
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
      userInfo: state.loginReducer.userInfo,
      token: state.loginReducer.token,
      loading: state.loginReducer.loading,
      btnDisabled: state.loginReducer.btnDisabled,
      successMessage: state.loginReducer.successMessage,
      failureMessage: state.loginReducer.failureMessage
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (input) => dispatch(actions.login(input)),
    enableLoginButton: () => dispatch(actions.enableLoginButton()),
    disableLoginButton: () => dispatch(actions.disableLoginButton())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
