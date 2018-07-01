import { combineEpics } from 'redux-observable';
import * as vocabulary from './vocabulary';
import * as game from './game';

export default combineEpics(
    ...Object.keys(vocabulary).map(k => vocabulary[k]),
    ...Object.keys(game).map(k => game[k]),
);
