import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import store from './store/';
import { requestPopulateVocabularies } from './actions/vocabulary';
// const wr = require('wordreference-api');
// wr('defiantly','en','gr').then((result)=> console.log('TRANSLATION', result));

store.dispatch(requestPopulateVocabularies());
store.subscribe(() => console.log(store.getState()));


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
