import * as types from '../constants/vocabulary';
import phrase from './phrase';

const initialState = {
    id: 0,
    title: '',
    url: '',
    lang1: '',
    lang2: '',
    phrases: [],
};

export default function(state = initialState, action = { type: '', payload: {} }) {
    const mapPhrase = (phraseState) => {
        return phraseState.id === action.payload.phrase.id ? phrase(phraseState, action) : phraseState;
    };
    switch (action.type) {
        case types.ADD_VOCABULARY:
            return Object.assign({}, state, action.payload);

        case types.EDIT_VOCABULARY:
            return Object.assign({}, state, action.payload);

        case types.ADD_PHRASE:
            return Object.assign({}, state, {
                phrases: [
                    phrase(undefined, action),
                    ...state.phrases,
                ]
            });

        case types.EDIT_PHRASE:
            return Object.assign({}, state, {
                phrases: state.phrases.map(mapPhrase)
            });

        case types.DELETE_PHRASE:
            return Object.assign({}, state, {
                phrases: state.phrases.filter(phrase =>
                    phrase.id !== action.payload.phraseId
                )
            });

        default:
            return state;
    }
};
