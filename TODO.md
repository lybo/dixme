Change constants and flow:
* requestAddVocabulary -> requestImportVocabulary at containers/Home.js DONE
* requestPopulateVocabularies -> requestSyncVocabularies DONE
* requestPopulateVocabularies -> requestPopulateVocabulariesFromLocal

calc and display phrases size in mb
```js

const g = JSON.stringify(phrases).replace(/[\[\]\,\"]/g,''); //stringify and remove all "stringification" extra data
g.length
```


vocabulary model
add:
* numberOfPhrasesWithTranslations
* phrasesSize
