import { combineEpics } from 'redux-observable';
import {
    requestPopulateVocabularies,
    requestAddVocabulary,
    requestUpdateVocabulary,
    requestDeleteVocabulary,
    requestAddPhrase,
    requestUpdatePhrase,
    requestDeletePhrase,
} from './vocabulary';

export default combineEpics(
    requestPopulateVocabularies,
    requestAddVocabulary,
    requestUpdateVocabulary,
    requestDeleteVocabulary,
    requestAddPhrase,
    requestUpdatePhrase,
    requestDeletePhrase,
);
