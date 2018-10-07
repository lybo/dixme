import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import App from '../../containers/App';
import { Provider } from 'react-redux'
import store from '../../store/';
import Search from './Search';
import { requestPopulateVocabulariesFromLocal } from '../../actions/vocabulary';
import { requestPopulateGameAnswersFromLocal } from '../../actions/game';

store.subscribe(() => {
  const state = JSON.parse(JSON.stringify(store.getState()));
  console.log(state.lastAction.type, state.lastAction.payload, state);
});

store.dispatch(requestPopulateVocabulariesFromLocal());
store.dispatch(requestPopulateGameAnswersFromLocal());
const Main = () => {
  return (
    <div className="Main">
      dfsdfsdfs:
      <Search />
      <Provider store={store}>
        <App />
      </Provider>
    </div>
  );
};

const ourContainer = document.createElement('div');
const readme = document.getElementById('readme');
const article = readme.querySelector('article');
readme.insertBefore(ourContainer, article);
ReactDOM.render(<Main />, ourContainer);
