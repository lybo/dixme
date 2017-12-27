import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import store from './store/';
import { requestPopulateVocabularies } from './actions/vocabulary';

store.dispatch(requestPopulateVocabularies());
store.subscribe(() => console.log(store.getState()));


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
