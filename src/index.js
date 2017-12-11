import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import Vocabularies from './containers/Vocabularies';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { populateVocabularies } from './actions/vocabulary';

const store = createStore(reducer)

store.dispatch(populateVocabularies([
    { id: 1, title: '1', url: '1' },
    { id: 2, title: '2', url: '2' },
]));

ReactDOM.render(
    <Provider store={store}>
        <Vocabularies />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
