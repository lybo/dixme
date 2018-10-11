import React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux'
import store from '../../store/';
import ContentScript from './ContentScript';
import { requestPopulateVocabulariesFromLocal } from '../../actions/vocabulary';
import { requestPopulateGameAnswersFromLocal } from '../../actions/game';

store.subscribe(() => {
  const state = JSON.parse(JSON.stringify(store.getState()));
  console.log(state.lastAction.type, state);
});

store.dispatch(requestPopulateVocabulariesFromLocal());
store.dispatch(requestPopulateGameAnswersFromLocal());

const Main = () => {
  return (
    <Provider store={store}>
      <ContentScript />
    </Provider>
  );
};
const tooltipContainer = document.createElement('div');
tooltipContainer.setAttribute('id', 'dixme');
document.body.appendChild(tooltipContainer);
ReactDOM.render(<Main />, tooltipContainer);
