import * as types from '../constants/vocabulary'

const initialState = {
    id: 0,
    text: '',
    translation: '',
    reference: '',
};

export default function(state = initialState, action = { type: '', payload: {} }) {
    switch (action.type) {
        case types.ADD_PHRASE:
            return Object.assign({}, state, action.payload.phrase);

        case types.EDIT_PHRASE:
            return Object.assign({}, state, action.payload.phrase);

        default:
            return state;
    }
};
