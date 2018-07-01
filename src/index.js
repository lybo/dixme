import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import store from './store/';
import { requestPopulateVocabulariesFromLocal } from './actions/vocabulary';
import { requestPopulateGameAnswersFromLocal } from './actions/game';
import { updateVocabularies, updateGame } from './services/localIntegration/';
import { UPDATE_GAME } from './constants/game';

store.dispatch(requestPopulateVocabulariesFromLocal());
store.dispatch(requestPopulateGameAnswersFromLocal());
store.subscribe(() => {
    const state = JSON.parse(JSON.stringify(store.getState()));
    console.log(state.lastAction.type, state.lastAction.payload, state);
    updateVocabularies(state.vocabularies);

    if (state.lastAction.type === UPDATE_GAME) {
        updateGame(state.game);
    }
});


setTimeout(() => {
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('root')
    );
    registerServiceWorker();
}, 10);
