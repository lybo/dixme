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
    switch (action.type) {
        case types.POPULATE_VOCABULARIES:
            return action.payload.map((payload) => vocabulary(undefined, {
                payload,
                type: types.ADD_VOCABULARY,
            }));

        case types.ADD_VOCABULARY:
            return [
                vocabulary(undefined, action),
                ...state
            ];

        case types.DELETE_VOCABULARY:
            return state.filter(vocabulary =>
                vocabulary.id !== action.payload
            );

        case types.EDIT_VOCABULARY:
            return state.map(mapVocabulary);

        case types.ADD_PHRASE:
            return state.map(mapVocabulary2);

        case types.EDIT_PHRASE:
            return state.map(mapVocabulary2);

        case types.DELETE_PHRASE:
            return state.map(mapVocabulary2);

        default:
            return state
    }
};
