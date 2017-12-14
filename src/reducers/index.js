import { combineReducers } from 'redux';
import app from './app';
import vocabularies from './vocabularies';

const App = combineReducers({
    vocabularies,
    app,
});

export default App;
