import * as types from '../constants/vocabulary';
import vocabulary from './vocabulary';

const initialState = [];

export default function vocabularies(state = initialState, action = { type: '', payload: {} }) {
    const mapVocabulary = (vocabularyState) => {
        return vocabularyState.id === action.payload.id ? vocabulary(vocabularyState, action) : vocabularyState;
    };

    const mapVocabulary2 = (vocabularyState) => {
        return vocabularyState.id === action.payload.vocabularyId ? vocabulary(vocabularyState, action) : vocabularyState;
    };

    const populateVocabulariesFromLocal = () => {
        return [].concat(
            state,
            action.payload.map((payload) => vocabulary(undefined, {
                payload,
                type: types.POPULATE_VOCABULARY_FROM_LOCAL,
            }))
        );
    };

    const syncVocabularies = () => {
        const newVocabularies = action.payload
            .filter(payload => !state.find(v => v.id === payload.id));

        return [].concat(
            state.map((vocabularyState) => {
                const payload = action.payload.find(v => v.id === vocabularyState.id);

                if (payload) {
                    return vocabulary(vocabularyState, {
                        payload,
                        type: types.CHECK_VOCABULARY_SYNC_STATUS,
                    });
                }

                return vocabularyState;
            }),
            newVocabularies.map((payload) => vocabulary(undefined, {
                payload,
                type: types.POPULATE_VOCABULARY_FROM_REMOTE,
            }))
        );
    };

    switch (action.type) {
        case types.POPULATE_VOCABULARIES_FROM_LOCAL:
            return populateVocabulariesFromLocal();

        case types.SYNC_VOCABULARIES:
            return syncVocabularies();

        case types.ADD_VOCABULARY:
        case types.IMPORT_VOCABULARY:
            return [
                vocabulary(undefined, action),
                ...state
            ];

        case types.DELETE_VOCABULARY:
            return state.filter(vocabulary =>
                vocabulary.id !== action.payload
            );

        case types.EDIT_VOCABULARY:
        case types.SYNC_VOCABULARY:
            return state.map(mapVocabulary);

        case types.ADD_PHRASE:
        case types.EDIT_PHRASE:
        case types.DELETE_PHRASE:
            return state.map(mapVocabulary2);

        default:
            return state
    }
};
