const levelup = require('levelup');
const leveldown = require('leveldown');
const encode = require('encoding-down');
const path = require('path');
const db = levelup(encode(leveldown(path.join(__dirname, './db')), {
  valueEncoding: 'json',
}));
const utils = require('../utils.js');


function getVocabularyDBId(vocabularyId, userId) {
  return `${userId}.${vocabularyId}`;
}

async function put(vocabulary, userId){
  const id = getVocabularyDBId(vocabulary.id, userId);
  await db.put(id, vocabulary)
  return await db.get(id);
}

async function get(vocabularyId, userId){
  const id = getVocabularyDBId(vocabularyId, userId);
  return await db.get(id);
}

async function getAllByUser(userId){
  return await utils.getList(db, (item) => {
    return item.key.indexOf(`${userId}.`) === 0;
  });
}

async function getAll(){
  return await utils.getListWithKeys(db, (item) => {
    return true;
  });
}

async function deleteVocabulary(id){
  return await db.del(id);
}

module.exports = {
  put,
  get,
  getAllByUser,
  getAll,
  deleteVocabulary,
};
