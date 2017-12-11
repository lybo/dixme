import * as types from '../constants/vocabulary'

const initialState = {
    id: 0,
    title: '',
    url: '',
    words: [],
};

export default function(state = initialState, action = { type: '', payload: {} }) {
    switch (action.type) {
        case types.ADD_VOCABULARY:
            return Object.assign({}, state, action.payload);

        case types.EDIT_VOCABULARY:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
};
