import * as integration from './localIntegration/';

//VOCABULARY
export function getVocabularies() {
    return integration.getVocabularies();
}

export function addVocabulary(vocabulary) {
    return integration.addVocabulary(vocabulary);
}

export function updateVocabulary(vocabulary) {
    return integration.updateVocabulary(vocabulary);
}

export function deleteVocabulary(vocabularyId) {
    return integration.deleteVocabulary(vocabularyId);
}

//PHRASE
export function addPhrase(phrase) {
    return integration.addPhrase(phrase);
}

export function updatePhrase(phrase) {
    return integration.updatePhrase(phrase);
}

export function deletePhrase(phraseId) {
    return integration.deletePhrase(phraseId);
}
