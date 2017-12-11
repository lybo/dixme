import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import Vocabularies from './containers/Vocabularies';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import store from './store/';
import { requestPopulateVocabularies } from './actions/vocabulary';

store.dispatch(requestPopulateVocabularies());

ReactDOM.render(
    <Provider store={store}>
        <Vocabularies />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
