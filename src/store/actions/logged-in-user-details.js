import axios from 'axios';
import * as actionTypes from './actionTypes';

const populateLoggedInUserDetails = userData => {
  return {
    type: actionTypes.POPULATE_LOGGEDIN_USER_DETAILS,
    user: userData.user,
    token: userData.token
  }
}

export const getLoggedInUserDetails = token => {
  return dispatch => {
    const axiosHeaders = {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json'
        }
    };

    axios.get(process.env.REACT_APP_UPDATE_DETAILS_URL, axiosHeaders).then(response => {
        dispatch(populateLoggedInUserDetails(response.data));
        
        localStorage.setItem('name', response.data.user.name);
        localStorage.setItem('email', response.data.user.email);
        localStorage.setItem('isSeller', response.data.user.isSeller);
        localStorage.setItem('token', response.data.token);
    })
    .catch(error => console.log(error))
  };
}

const populateLoggedInUserAddress = userAddress => {
  return {
    type: actionTypes.POPULATE_LOGGEDIN_USER_ADDRESS,
    address: userAddress
  }
}

export const getLoggedInUserAddress = token => {
  return dispatch => {
      const axiosHeaders = {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json'
          }
      };

      axios.get(process.env.REACT_APP_UPDATE_ADDRESS_URL, axiosHeaders).then(response => {
        dispatch(populateLoggedInUserAddress(response.data.address));
        
        localStorage.setItem('addr1', response.data.address.addr1);
        localStorage.setItem('addr2', response.data.address.addr2);
        localStorage.setItem('city', response.data.address.city);
        localStorage.setItem('country', response.data.address.country);
        localStorage.setItem('postalCode', response.data.address.postalCode);
        localStorage.setItem('state', response.data.address.state);
      })
      .catch(error => console.log(error))
  };
}