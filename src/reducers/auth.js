import * as types from '../constants/auth';
import * as AuthService from '../services/authService/';

const authReducer = (
  state = {
    isAuthenticated: !AuthService.isTokenExpired(),
    isFetching: false,
    profile: AuthService.getProfile(),
    error: null
  },
  action
) => {
  switch (action.type) {
    case types.REQUEST_LOGIN:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        profile: action.payload.profile
      };
    case types.LOGIN_ERROR:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        profile: {},
        error: action.error
      };
    case types.LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        profile: {}
      };
    default:
      return state;
  }
};

export default authReducer;

