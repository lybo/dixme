import * as types from '../constants/game';

// POPULATE_GAME_ANSWERS_FROM_LOCAL
export function populateGameAnswersFromLocal(data) {
  return {
    type: types.POPULATE_GAME_ANSWERS_FROM_LOCAL,
    payload: data
  }
}

// UPDATE_GAME
export function updateGame(data) {
  return {
    type: types.UPDATE_GAME,
    payload: data
  }
}

// REQUEST_POPULATE_GAME_ANSWERS_FROM_LOCAL
export function requestPopulateGameAnswersFromLocal(data) {
  return {
    type: types.REQUEST_POPULATE_GAME_ANSWERS_FROM_LOCAL,
    payload: data
  }
}

// REQUEST_UPDATE_GAME
export function requestUpdateGame(data) {
  return {
    type: types.REQUEST_UPDATE_GAME,
    payload: data
  }
}
