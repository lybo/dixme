import { getModelVocabulary } from '../../reducers/vocabulary';

export function getVocabularies() {
    return new Promise(function(resolve, reject) {
        const vocabularies = JSON.parse(localStorage.getItem('vocabularies')) || [];
        resolve(vocabularies);
    });
}

export function addVocabulary(vocabulary) {
    return new Promise(function(resolve, reject) {
        const vocabularies = JSON.parse(localStorage.getItem('vocabularies')) || [];
        localStorage.setItem('vocabularies', JSON.stringify([
            getModelVocabulary(vocabulary),
            ...vocabularies
        ]));
        resolve(vocabulary);
    });
}

export function updateVocabulary(vocabulary) {
    return new Promise(function(resolve, reject) {
        resolve(vocabulary);
    });
}

export function deleteVocabulary(vocabularyId) {
    return new Promise(function(resolve, reject) {
        const vocabularies = JSON.parse(localStorage.getItem('vocabularies')) || [];
        localStorage.setItem('vocabularies', JSON.stringify(vocabularies.filter(vocabulary =>
            vocabulary.id !== vocabularyId
        )));
        resolve(vocabularyId);
    });
}

export function addPhrase(phraseData) {
    return new Promise(function(resolve, reject) {
        const vocabularies = JSON.parse(localStorage.getItem('vocabularies')) || [];
        const vocabulary = vocabularies.find(vocabulary =>
            vocabulary.id === phraseData.vocabularyId
        );
        vocabulary.phrases.push(phraseData.phrase);
        localStorage.setItem('vocabularies', JSON.stringify(vocabularies));
        resolve(phraseData);
    });
}

export function updatePhrase(phrase) {
    return new Promise(function(resolve, reject) {
        resolve(phrase);
    });
}

export function deletePhrase(phraseData) {
    return new Promise(function(resolve, reject) {
        const vocabularies = JSON.parse(localStorage.getItem('vocabularies')) || [];
        const vocabulary = vocabularies.find(vocabulary =>
            vocabulary.id === phraseData.vocabularyId
        );
        vocabulary.phrases = vocabulary.phrases.filter(phrase =>
            phrase.id !== phraseData.phraseId
        );
        localStorage.setItem('vocabularies', JSON.stringify(vocabularies));
        resolve(phraseData);
    });
}
