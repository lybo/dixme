import { SET_VOCABULARY_SELECTED } from '../constants/vocabulary';

const initialState = {
    selectedVocabulary: null
};

export default function app(state = initialState, action = { type: '', payload: {} }) {

    switch (action.type) {
        case SET_VOCABULARY_SELECTED:
            return Object.assign({}, state, {
                selectedVocabulary: action.payload
            });

        default:
            return state
    }
};
