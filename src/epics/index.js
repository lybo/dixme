import { combineEpics } from 'redux-observable';
import * as vocabulary from './vocabulary';

export default combineEpics(
    ...Object.keys(vocabulary).map(k => vocabulary[k]),
);
