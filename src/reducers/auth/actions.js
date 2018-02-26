import * as types from './types';

export const requestLogin = () => ({
    type: types.REQUEST_LOGIN
});

export const loginSuccess = profile => ({
    type: types.LOGIN_SUCCESS,
    payload: { profile }
});

export const loginError = error => ({
    type: types.LOGIN_ERROR,
    error
});

export const logoutSuccess = () => ({
    type: types.LOGOUT_SUCCESS
});

