import * as types from '../constants/vocabulary';
import phrase from './phrase';

/**
 * @namespace
 * @constant
 * @type {object}
 *
 * @property {number} id - Vocabulay id
 *
 */
const initialState = {
    id: 0,
    title: '',
    url: '',
    langFrom: '',
    langTo: '',
    type: 'TRANSLATION',
    lastPageNumber: 1,
    pdfLastScrollPosition: 0,
    createdAt: 0,
    updatedAt: 0,
    syncSource: '',
    syncDeletedPhrases: 0,
    syncStatus: false,
    numberOfPhrasesWithReference: 0,
    numberOfPhrases: 0,
    phrasesFileSystemSize: 0,
    phrases: [],
};

export default function(state = initialState, action = { type: '', payload: {} }) {

    const mapPhrase = (phraseState) => {
        return phraseState.id === action.payload.phrase.id ? phrase(phraseState, action) : phraseState;
    };

    const getPhrasePropValue  = (prop) => {
        const findingPhrase = state.phrases.find(phrase => phrase.id === action.payload.phraseId);
        return findingPhrase[prop];
    };

    const getDeletedPhrasesNumber = () => {
        return getPhrasePropValue('isNew') ? state.syncDeletedPhrases : state.syncDeletedPhrases + 1;
    };

    const getFileSystemSize = (phrases = []) => {
        return JSON.stringify(phrases).replace(/[[\],"]/g,'').length;
    };

    const getSyncedVocabulary = () => {
        if (!state.id) {

        }

    };
    switch (action.type) {
        case types.POPULATE_VOCABULARY_FROM_REMOTE:
            console.log(Object.assign({}, state, action.payload, {
                syncStatus: true,
            }));
            return Object.assign({}, state, action.payload, {
                syncStatus: true,
            });

        case types.POPULATE_VOCABULARY_FROM_LOCAL:
            // keep temporaly the following for legacy data structure
            return Object.assign({}, state, action.payload, {
                numberOfPhrasesWithReference: action.payload.numberOfPhrasesWithReference || (action.payload.phrases && action.payload.phrases.filter(phrase => phrase.translationReference !== '').length) || 0,
                numberOfPhrases: action.payload.numberOfPhrases || (action.payload.phrases && action.payload.phrases.length) || 0,
                phrasesFileSystemSize: getFileSystemSize(action.payload.phrases),
                syncStatus: false,
            });

        case types.IMPORT_VOCABULARY:
            return Object.assign({}, state, action.payload, {
                numberOfPhrasesWithReference: action.payload.numberOfPhrasesWithReference || (action.payload.phrases && action.payload.phrases.filter(phrase => phrase.translationReference !== '').length) || 0,
                numberOfPhrases: action.payload.numberOfPhrases || (action.payload.phrases && action.payload.phrases.length) || 0,
                phrasesFileSystemSize: getFileSystemSize(action.payload.phrases),
                syncStatus: false,
            });

        case types.ADD_VOCABULARY:
            return Object.assign({}, state, action.payload, {
                createdAt: new Date().getTime(),
                syncStatus: false,
            });

        case types.EDIT_VOCABULARY:
            return Object.assign({}, state, action.payload, {
                updatedAt: new Date().getTime(),
            });

        case types.SYNC_VOCABULARY:
            return Object.assign({}, state, {
                updatedAt: new Date().getTime(),
                syncStatus: true,
                syncDeletedPhrases: 0,
                phrases: state.phrases.map(phrase => ({
                    ...phrase,
                    isNew: false,
                })),
            });

        case types.CHECK_VOCABULARY_SYNC_STATUS:
            console.log(
                action.payload.title,
                new Date(state.updatedAt),
                new Date(action.payload.updatedAt)
            );
            return Object.assign({}, state, {
                syncStatus: !(state.updatedAt - action.payload.updatedAt > 0),
            });

        case types.ADD_PHRASE:
            return Object.assign({}, state, {
                phrases: [
                    phrase(undefined, action),
                    ...state.phrases,
                ],
                numberOfPhrasesWithReference: action.payload.translationReference !== '' ? state.numberOfPhrasesWithReference + 1 : state.numberOfPhrasesWithReference,
                numberOfPhrases: state.numberOfPhrases + 1,
                updatedAt: new Date().getTime(),
                syncStatus: false,
            });

        case types.EDIT_PHRASE:
            return Object.assign({}, state, {
                phrases: state.phrases.map(mapPhrase),
                updatedAt: new Date().getTime(),
                syncStatus: false,
            });

        case types.DELETE_PHRASE:
            return Object.assign({}, state, {
                numberOfPhrasesWithReference: getPhrasePropValue('translationReference') !== '' ? state.numberOfPhrasesWithReference - 1 : state.numberOfPhrasesWithReference,
                numberOfPhrases: state.numberOfPhrases - 1,
                phrases: state.phrases.filter(phrase =>
                    phrase.id !== action.payload.phraseId
                ),
                updatedAt: new Date().getTime(),
                syncStatus: false,
                syncDeletedPhrases: getDeletedPhrasesNumber(),
            });

        default:
            return state;
    }
};

export function getModelVocabulary(data) {
    return Object.assign({}, initialState, data);
};
