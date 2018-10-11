import wordreferenceApi from './wordreference';

const wordreferenceCodeLanguagesAPI = {
  'en': 'en',
  'es': 'es',
  'fr': 'fr',
  'it': 'it',
  'pt': 'pt',
  'de': 'de',
  'nl': 'nl',
  'sv': 'sv',
  'ru': 'ru',
  'pl': 'pl',
  'ro': 'ro',
  'cs': 'cz',
  'el': 'gr',
  'tr': 'tr', // it doesn't work
  'zh': 'zh',
  'ja': 'ja',
  'ko': 'ko',
  'ar': 'ar',
};

const supportedCodeLanguages = Object.keys(wordreferenceCodeLanguagesAPI);
export function getSupportedLanguage(code) {
  return supportedCodeLanguages.includes(code) ? wordreferenceCodeLanguagesAPI[code] : null;
};

export function getTranslationLangKeys({ langFrom, langTo }) {
  return {
    langFrom: getSupportedLanguage(langFrom) || 'en',
    langTo: getSupportedLanguage(langTo) || 'el',
  };
}


export function hasTranslationAPI({ langFrom, langTo }) {
  return [langFrom, langTo].includes('en');
}

export function translate(word, lang1, lang2) {
  return wordreferenceApi(word, lang1, lang2);
};
