// import React from 'react';
import { connect } from 'react-redux';
import Layout from '../components/Layout';
// import ImportVocabularyForm from '../components/ImportVocabularyForm';
import {
  requestAddVocabulary,
} from '../actions/vocabulary';
import * as authActions from '../actions/auth';
import * as AuthService from '../services/authService/';

export default connect(
  (state, ownProps) => {
    return {
      auth: state.auth,
    };
  },
  (dispatch, ownProps) => {
    const navigate = ownProps.history.push;
    return {
      navigate,
      addVocabulary: (data) => {
        dispatch(requestAddVocabulary(data));
      },
      loginSuccess: profile => dispatch(authActions.loginSuccess(profile)),
      loginError: error => dispatch(authActions.loginError(error)),
      requestLogin: () => {
        AuthService.login();
        dispatch(authActions.requestLogin());
      },
      logoutSuccess: () => {
        dispatch(authActions.logoutSuccess());
        AuthService.logout(); // careful, this is a static method
      },
    };
  },
)(Layout);
