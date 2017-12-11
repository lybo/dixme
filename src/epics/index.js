import { combineEpics } from 'redux-observable';
import {
    requestPopulateVocabularies,
    requestAddVocabulary,
    requestUpdateVocabulary,
    requestDeleteVocabulary,

} from './vocabulary';


export default combineEpics(
    requestPopulateVocabularies,
    requestAddVocabulary,
    requestUpdateVocabulary,
    requestDeleteVocabulary,
);
