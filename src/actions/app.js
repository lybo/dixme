import * as types from '../constants/app';


//SET_PDF_PATH
export function setPDFPath(data) {
  return {
    type: types.SET_PDF_PATH,
    payload: data
  }
}

//SET_SELECTED_PHRASE
export function setSelectedPhrase(data) {
  return {
    type: types.SET_SELECTED_PHRASE,
    payload: data
  }
}

//SET_REMOTE_VOCABULARY
export function setRemoteVocabulary(data) {
  return {
    type: types.SET_REMOTE_VOCABULARY,
    payload: data
  }
}

//SET_REQUEST
export function setRequest(data) {
  return {
    type: types.SET_REQUEST,
    payload: data
  }
}
