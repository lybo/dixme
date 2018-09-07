import {
  SET_VOCABULARY_SELECTED,
} from '../constants/vocabulary';
import {
  SET_PDF_PATH,
  SET_SELECTED_PHRASE,
  SET_REMOTE_VOCABULARY,
  SET_REQUEST,
} from '../constants/app';
import * as request from '../constants/request';

const initialState = {
  selectedVocabulary: null,
  selectedPhrase: null,
  pdfPath: null,
  remoteVocabulary: null,
  requests: {
    updateVocabulary: {
      status: request.IDLE,
      error: '',
    },
  },
  errorMessages: [],
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

    case SET_REMOTE_VOCABULARY:
      return Object.assign({}, state, {
        remoteVocabulary: action.payload
      });

    case SET_REQUEST:
      state.requests[action.payload.requestName] = Object.assign(
        {},
        state.requests[action.payload.requestName],
        action.payload.requestData,
      );
      return {
        ...state,
        requests: Object.assign({}, state.requests),
      };

    default:
      return state
  }
};
