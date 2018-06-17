import wordreferenceApi from './wordreference';

export function translate(word, lang1, lang2) {
  return wordreferenceApi(word, lang1, lang2);
};
