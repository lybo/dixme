import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import store from './store/';
import { requestPopulateVocabularies, addPhrase, updatePhrase, deletePhrase } from './actions/vocabulary';

store.dispatch(requestPopulateVocabularies());
store.subscribe(() => console.log(store.getState()));

setTimeout(() => {
    store.dispatch(addPhrase({
        vocabularyId: 2,
        phrase: {
            id: 1,
            text: 'word',
            translation: 'κόσμε',
            reference: '',
        }
    }));
}, 5000);

setTimeout(() => {
    store.dispatch(deletePhrase({
        vocabularyId: 2,
        phraseId: 1,
    }));
}, 7000);

setTimeout(() => {
    store.dispatch(updatePhrase({
        vocabularyId: 2,
        phrase: {
            id: 0,
            text: 'today',
            translation: 'σήμερα',
            reference: '',
        }
    }));
}, 8000);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
