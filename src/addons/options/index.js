import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { Provider } from 'react-redux'
import store from '../../store/';
import App from '../../containers/App';
import { requestPopulateVocabulariesFromLocal } from '../../actions/vocabulary';
import { requestPopulateGameAnswersFromLocal } from '../../actions/game';

store.subscribe(() => {
  const state = JSON.parse(JSON.stringify(store.getState()));
  console.log(state.lastAction.type, state);
});


store.dispatch(requestPopulateVocabulariesFromLocal());
store.dispatch(requestPopulateGameAnswersFromLocal());
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('main'),
);
