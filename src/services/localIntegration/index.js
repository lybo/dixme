import { getModelVocabulary } from '../../reducers/vocabulary';
import localStorage from './localStorage';

export async function getGame() {
  const game = await localStorage.getItem('game');
  return game || {};
}
export function updateGame(game) {
  return localStorage.setItem('game', game);
}

export function updateVocabularies(vocabularies) {
  return localStorage.setItem('vocabularies', vocabularies);
}

export async function getVocabularies() {
  const vocabularies = await localStorage.getItem('vocabularies');
  return vocabularies || [];
}

export async function addVocabulary(vocabulary) {
  const vocabularies = await localStorage.getItem('vocabularies') || [];
  await localStorage.setItem('vocabularies', [
    getModelVocabulary(vocabulary),
    ...vocabularies
  ]);
  return vocabulary;
}

export async function updateVocabulary(vocabulary) {
  const mapVocabulary = (vocabularyState) => {
    return vocabularyState.id === vocabulary.id ? Object.assign({}, vocabularyState, vocabulary) : vocabularyState;
  };
  const vocabularies = await localStorage.getItem('vocabularies') || [];
  await localStorage.setItem('vocabularies', vocabularies.map(mapVocabulary));
  return vocabulary;
}

export async function deleteVocabulary(vocabularyId) {
  const vocabularies = await localStorage.getItem('vocabularies') || [];
  await localStorage.setItem('vocabularies', vocabularies.filter(vocabulary =>
    vocabulary.id !== vocabularyId
  ));
  return vocabularyId;
}

export async function addPhrase(phraseData) {
  const vocabularies = await localStorage.getItem('vocabularies') || [];
  const vocabulary = vocabularies.find(vocabulary =>
    vocabulary.id === phraseData.vocabularyId
  );
  vocabulary.phrases.push(phraseData.phrase);
  await localStorage.setItem('vocabularies', vocabularies);
  return phraseData;
}

export async function updatePhrase(phraseData) {
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
  const vocabularies = await localStorage.getItem('vocabularies') || [];
  await localStorage.setItem('vocabularies', vocabularies.map(mapVocabulary));
  return phraseData;
}

export async function deletePhrase(phraseData) {
  const vocabularies = await localStorage.getItem('vocabularies') || [];
  const vocabulary = vocabularies.find(vocabulary =>
    vocabulary.id === phraseData.vocabularyId
  );
  vocabulary.phrases = await vocabulary.phrases.filter(phrase =>
    phrase.id !== phraseData.phraseId
  );
  await localStorage.setItem('vocabularies', vocabularies);
  return phraseData;
}
