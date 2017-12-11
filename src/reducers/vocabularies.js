import { ADD_VOCABULARY, DELETE_VOCABULARY, EDIT_VOCABULARY, POPULATE_VOCABULARIES } from '../constants/vocabulary';
import vocabulary from './vocabulary';

const initialState = [];

export default function vocabularies(state = initialState, action = { type: '', payload: {} }) {
    const mapTemplate = (vocabularyState) => {
        return vocabularyState.id === action.payload.id ? vocabulary(vocabularyState, action) : vocabularyState;
    };

    switch (action.type) {
        case POPULATE_VOCABULARIES:
            return action.payload;

        case ADD_VOCABULARY:
            return [
                vocabulary(undefined, action),
                ...state
            ];

        case DELETE_VOCABULARY:
            return state.filter(vocabulary =>
                vocabulary.id !== action.payload
            );

        case EDIT_VOCABULARY:
            return state.map(mapTemplate);

        default:
            return state
    }
};
