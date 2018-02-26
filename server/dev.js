const vocabulariesDB = require('./db/vocabulary/');

async function getAll() {
    const vocabularies = await vocabulariesDB.getAll();
    console.log(vocabularies);
    return vocabularies;
}

async function deleteVocabulary(vocabularyId) {
    await vocabulariesDB.deleteVocabulary(vocabularyId);
    console.log('deleted', vocabularyId);
}

async function deleteAllVocabularies() {
    const vocabularies = await getAll();
    vocabularies.map(async (v) => deleteVocabulary(v.key));
}


getAll();
// deleteVocabulary();
// deleteAllVocabularies();
