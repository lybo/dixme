import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import App from '../../containers/App';
import { Provider } from 'react-redux'
import store from '../../store/';
import Search from './Search';

const Main = () => {
  return (
    <div className="Main">
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
