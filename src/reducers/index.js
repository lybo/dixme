import { combineReducers } from 'redux';
import app from './app';
import vocabularies from './vocabularies';
import auth from './auth';

function lastAction(state = null, action) {
    return action;
}

const App = combineReducers({
    vocabularies,
    app,
    auth,
    lastAction,
});

export default App;
