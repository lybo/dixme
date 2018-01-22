import {
    SET_VOCABULARY_SELECTED,
} from '../constants/vocabulary';

import {
    SET_PDF_PATH,
    SET_SELECTED_PHRASE,
} from '../constants/app';

const initialState = {
    selectedVocabulary: null,
    selectedPhrase: null,
    pdfPath: null,
};

export default function app(state = initialState, action = { type: '', payload: {} }) {

    switch (action.type) {
        case SET_VOCABULARY_SELECTED:
            return Object.assign({}, state, {
                selectedVocabulary: action.payload
            });

        case SET_PDF_PATH:
            return Object.assign({}, state, {
                pdfPath: action.payload
            });

        case SET_SELECTED_PHRASE:
            return Object.assign({}, state, {
                selectedPhrase: action.payload
            });

        default:
            return state
    }
};
