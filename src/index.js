import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import store from './store/';
import { requestPopulateVocabulariesFromLocal } from './actions/vocabulary';
import { updateVocabularies } from './services/localIntegration/'

store.dispatch(requestPopulateVocabulariesFromLocal());
store.subscribe(() => {
    const state = JSON.parse(JSON.stringify(store.getState()));
    console.log(state.lastAction.type, state.lastAction.payload, state);
    updateVocabularies(state.vocabularies);
});


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
