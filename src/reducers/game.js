import * as types from '../constants/game';

/**
 * @namespace
 * @constant
 * @type {object}
 *
 * @property {number} id - Vocabulay id
 *
 */
const initialState = {
};

function updateGame(state, { vocabularyId, words = {} }) {
  if (!vocabularyId) {
    return state;
  }
  const newState = { ...state };
  Object.keys(words).forEach(wordId => {
    if (!newState[vocabularyId]) {
      newState[vocabularyId] = {};
    }

    if (!newState[vocabularyId][wordId]) {
      newState[vocabularyId][wordId] = {
        numberOfAnswers: 0,
        wrongAnswers: 0,
      };
    }

    newState[vocabularyId][wordId] = Object.assign({}, newState[vocabularyId][wordId], {
      numberOfAnswers: newState[vocabularyId][wordId].numberOfAnswers + 1,
      wrongAnswers: words[wordId] ? newState[vocabularyId][wordId].wrongAnswers : newState[vocabularyId][wordId].wrongAnswers + 1,
    });
  });

  return newState;
}

export default function(state = initialState, action = { type: '', payload: {} }) {
  switch (action.type) {
    case types.POPULATE_GAME_ANSWERS_FROM_LOCAL:
      return Object.assign({}, state, action.payload);

    case types.UPDATE_GAME:
      return updateGame(state, action.payload);

    default:
      return state;
  }
};
