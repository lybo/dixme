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
    const mapVocabulary = (vocabularyState) => {
        return vocabularyState.id === vocabulary.id ? Object.assign({}, vocabularyState, vocabulary) : vocabularyState;
    };
    return new Promise(function(resolve, reject) {
        const vocabularies = JSON.parse(localStorage.getItem('vocabularies')) || [];
        localStorage.setItem('vocabularies', JSON.stringify(vocabularies.map(mapVocabulary)));
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

export function updatePhrase(phraseData) {
    const mapPhrase = (phraseState) => {
        return phraseState.id === phraseData.phrase.id ? Object.assign({}, phraseState, phraseData.phrase) : phraseState;
    };
    const mapVocabulary = (vocabularyState) => {
        return vocabularyState.id === phraseData.vocabularyId ? Object.assign(
            {},
            vocabularyState,
            Object.assign({}, vocabularyState, {
                phrases: vocabularyState.phrases.map(mapPhrase)
            }),
        ) : vocabularyState;
    };
    return new Promise(function(resolve, reject) {
        const vocabularies = JSON.parse(localStorage.getItem('vocabularies')) || [];
        localStorage.setItem('vocabularies', JSON.stringify(vocabularies.map(mapVocabulary)));
        resolve(phraseData);
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
