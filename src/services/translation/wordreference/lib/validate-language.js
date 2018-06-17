export default function (lang) {
  const langs = ['en', 'es', 'fr', 'it', 'pt', 'de', 'nl', 'sv', 'ru', 'pl', 'ro', 'cz', 'gr', 'tr', 'zh', 'ja', 'ko', 'ar'];

  if (langs.indexOf(lang) !== -1) {
    return lang;
  } else {
    throw Error('Invalid language');
  }
};
