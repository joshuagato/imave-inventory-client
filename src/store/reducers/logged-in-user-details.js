import * as actionTypes from '../actions/actionTypes';

const initialState = {
  personalDetails: {
    firstname: '' || localStorage.getItem('firstname'),
    lastname: '' || localStorage.getItem('lastname'),
    email: '' || localStorage.getItem('email'),
    token: '' || localStorage.getItem('token')
  },
  shippingAddress: {
    addr1: '' || localStorage.getItem('addr1'),
    addr2: '' || localStorage.getItem('addr2'),
    city: '' || localStorage.getItem('city'),
    state: '' || localStorage.getItem('state'),
    country: '' || localStorage.getItem('country'),
    postalCode: '' || localStorage.getItem('postalCode')
  }
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.POPULATE_LOGGEDIN_USER_DETAILS:
        return { ...state, personalDetails: {
                  ...state.personalDetails, name: action.user.name, email: action.user.email,
                    isSeller: action.user.isSeller, token: action.token
            }
        };
    
    case actionTypes.UPDATE_SUCCESS:
        return { ...state, personalDetails: {
                ...state.personalDetails, name: action.user.name, email: action.user.email,
                    isSeller: action.user.isSeller, token: action.token
            }
        };

        case actionTypes.POPULATE_LOGGEDIN_USER_ADDRESS:
            return { ...state, shippingAddress: {
                    ...state.shippingAddress, addr1: action.address.addr1, addr2: action.address.addr2,
                        city: action.address.city, state: action.address.state, country: action.address.country,
                          postalCode: action.address.postalCode
                }
            };
        
        case actionTypes.UPDATE_ADDRESS_SUCCESS:
            return { ...state, shippingAddress: {
                    ...state.shippingAddress, addr1: action.address.addr1, addr2: action.address.addr2,
                        city: action.address.city, state: action.address.state, country: action.address.country,
                          postalCode: action.address.postalCode
                }
            };

    case actionTypes.LOGOUT:
      return { ...state, personalDetails: {}, shippingAddress: {} };

    default: return state;
  }
}

export default reducer;