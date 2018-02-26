import * as integration from './localIntegration/';
import * as sync from './sync/';

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

export function getRemoteVocabulary(vocabularyId) {
    return sync.getVocabulary(vocabularyId);
}

export function updateRemoteVocabulary(vocabulary) {
    return sync.updateVocabulary(vocabulary);
}

export function updateRemoteVocabularyPhrases(vocabulary) {
    return sync.getVocabularyPhrases(vocabulary);
}

export function getRemoteVocabularies(vocabularies) {
    return sync.getUserVocabularies(vocabularies);
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
