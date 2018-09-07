import * as types from '../constants/vocabulary';


//ADD_VOCABULARY
export function addVocabulary(data) {
  return {
    type: types.ADD_VOCABULARY,
    payload: data
  }
}

//POPULATE_VOCABULARIES
export function populateVocabularies(data) {
  return {
    type: types.POPULATE_VOCABULARIES,
    payload: data
  }
}

//EDIT_VOCABULARY
export function updateVocabulary(data) {
  return {
    type: types.EDIT_VOCABULARY,
    payload: data
  }
}

//DELETE_VOCABULARY
export function deleteVocabulary(data) {
  return {
    type: types.DELETE_VOCABULARY,
    payload: data
  }
}

//REQUEST_ADD_VOCABULARY
export function requestAddVocabulary(data) {
  return {
    type: types.REQUEST_ADD_VOCABULARY,
    payload: data
  }
}

//REQUEST_POPULATE_VOCABULARIES_FROM_LOCAL
export function requestPopulateVocabulariesFromLocal(data) {
  return {
    type: types.REQUEST_POPULATE_VOCABULARIES_FROM_LOCAL,
    payload: data
  }
}

//REQUEST_EDIT_VOCABULARY
export function requestUpdateVocabulary(data) {
  return {
    type: types.REQUEST_EDIT_VOCABULARY,
    payload: data
  }
}

//REQUEST_DELETE_VOCABULARY
export function requestDeleteVocabulary(data) {
  return {
    type: types.REQUEST_DELETE_VOCABULARY,
    payload: data
  }
}
