import * as types from '../constants/vocabulary';


//POPULATE_VOCABULARIES
export function populateVocabularies(data) {
    return {
        type: types.POPULATE_VOCABULARIES,
        payload: data
    }
}

//ADD_VOCABULARY
export function addVocabulary(data) {
    return {
        type: types.ADD_VOCABULARY,
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

//SET_VOCABULARY_SELECTED
export function setVocabularySelected(vocabularyId) {
    return {
        type: types.SET_VOCABULARY_SELECTED,
        payload: vocabularyId
    }
}

//ADD_PHRASE
export function addPhrase(data) {
    return {
        type: types.ADD_PHRASE,
        payload: data
    }
}

//EDIT_PHRASE
export function updatePhrase(data) {
    return {
        type: types.EDIT_PHRASE,
        payload: data
    }
}

//DELETE_PHRASE
export function deletePhrase(data) {
    return {
        type: types.DELETE_PHRASE,
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

//REQUEST_POPULATE_VOCABULARIES
export function requestPopulateVocabularies(data) {
    return {
        type: types.REQUEST_POPULATE_VOCABULARIES,
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
