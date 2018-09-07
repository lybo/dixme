import * as types from '../constants/vocabulary';


// POPULATE_VOCABULARIES_FROM_LOCAL
export function populateVocabulariesFromLocal(data) {
  return {
    type: types.POPULATE_VOCABULARIES_FROM_LOCAL,
    payload: data
  }
}

// POPLATE_VOCABULARY
export function populateVocabularyFromLocal(data) {
  return {
    type: types.POPULATE_VOCABULARY_FROM_LOCAL,
    payload: data
  }
}

// POPULATE_REMOTE_VOCABULARY_PHRASES
export function populateRemoteVocabularyPhrases(data) {
  return {
    type: types.POPULATE_REMOTE_VOCABULARY_PHRASES,
    payload: data
  }
}

// SYNC_VOCABULARIES
export function syncVocabularies(data) {
  return {
    type: types.SYNC_VOCABULARIES,
    payload: data
  }
}

// SYNC_VOCABULARY
export function syncVocabulary(data) {
  return {
    type: types.SYNC_VOCABULARY,
    payload: data
  }
}

// IMPORT_VOCABULARY
export function importVocabulary(data) {
  return {
    type: types.IMPORT_VOCABULARY,
    payload: data
  }
}

// ADD_VOCABULARY
export function addVocabulary(data) {
  return {
    type: types.ADD_VOCABULARY,
    payload: data
  }
}

// EDIT_VOCABULARY
export function updateVocabulary(data) {
  return {
    type: types.EDIT_VOCABULARY,
    payload: data
  }
}

// DELETE_VOCABULARY
export function deleteVocabulary(data) {
  return {
    type: types.DELETE_VOCABULARY,
    payload: data
  }
}

// SET_VOCABULARY_SELECTED
export function setVocabularySelected(vocabularyId) {
  return {
    type: types.SET_VOCABULARY_SELECTED,
    payload: vocabularyId
  }
}

// ADD_PHRASE
export function addPhrase(data) {
  return {
    type: types.ADD_PHRASE,
    payload: data
  }
}

// EDIT_PHRASE
export function updatePhrase(data) {
  return {
    type: types.EDIT_PHRASE,
    payload: data
  }
}

// DELETE_PHRASE
export function deletePhrase(data) {
  return {
    type: types.DELETE_PHRASE,
    payload: data
  }
}

// REQUEST_GET_REMOTE_VOCABULARY
export function requestGetRemoteVocabulary(data) {
  return {
    type: types.REQUEST_GET_REMOTE_VOCABULARY,
    payload: data
  }
}

// REQUEST_GET_REMOTE_VOCABULARY_PHRASES
export function requestGetRemoteVocabularyPhrases(data) {
  return {
    type: types.REQUEST_GET_REMOTE_VOCABULARY_PHRASES,
    payload: data
  }
}

// REQUEST_SYNC_VOCABULARY
export function requestSyncVocabulary(data) {
  return {
    type: types.REQUEST_SYNC_VOCABULARY,
    payload: data
  }
}

// REQUEST_SYNC_VOCABULARIES
export function requestSyncVocabularies(data) {
  return {
    type: types.REQUEST_SYNC_VOCABULARIES,
    payload: data
  }
}

// REQUEST_ADD_VOCABULARY
export function requestAddVocabulary(data) {
  return {
    type: types.REQUEST_ADD_VOCABULARY,
    payload: data
  }
}

// REQUEST_POPULATE_VOCABULARIES_FROM_LOCAL
export function requestPopulateVocabulariesFromLocal(data) {
  return {
    type: types.REQUEST_POPULATE_VOCABULARIES_FROM_LOCAL,
    payload: data
  }
}

// REQUEST_EDIT_VOCABULARY
export function requestUpdateVocabulary(data) {
  return {
    type: types.REQUEST_EDIT_VOCABULARY,
    payload: data
  }
}

// REQUEST_DELETE_VOCABULARY
export function requestDeleteVocabulary(data) {
  return {
    type: types.REQUEST_DELETE_VOCABULARY,
    payload: data
  }
}

// REQUEST_IMPORT_VOCABULARY
export function requestImportVocabulary(data) {
  return {
    type: types.REQUEST_IMPORT_VOCABULARY,
    payload: data
  }
}

// REQUEST_ADD_PHRASE
export function requestAddPhrase(data) {
  return {
    type: types.REQUEST_ADD_PHRASE,
    payload: data
  }
}

// REQUEST_EDIT_PHRASE
export function requestUpdatePhrase(data) {
  return {
    type: types.REQUEST_EDIT_PHRASE,
    payload: data
  }
}

// REQUEST_DELETE_PHRASE
export function requestDeletePhrase(data) {
  return {
    type: types.REQUEST_DELETE_PHRASE,
    payload: data
  }
}
