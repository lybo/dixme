import * as api from '../services/index'
import * as actions from '../actions/vocabulary'
import * as appActions from '../actions/app'
import * as types from '../constants/vocabulary'
import { Observable } from 'rxjs/Observable'
import * as request from '../constants/request';


// POPULATE_VOCABULARIES
export const requestPopulateVocabulariesFromLocal = (action$, store) => {
    return action$
        .ofType(types.REQUEST_POPULATE_VOCABULARIES_FROM_LOCAL)
        .map(action => action.payload)
        .flatMap(payload =>
            // Concat 2 observables so they fire sequentially
            Observable.concat(
                Observable.fromPromise(api.getVocabularies(payload))
                    .flatMap(data =>
                        // Concat 2 observables so they fire sequentially
                        Observable.concat(
                            Observable.of(actions.populateVocabulariesFromLocal(data)),
                        )
                    )
            )
        );
};

// SYNC_VOCABULARIES
export const requestSyncVocabularies = (action$, store) => {
    const requestName = 'requestSyncVocabularies';
    return action$
        .ofType(types.REQUEST_SYNC_VOCABULARIES)
        .map(action => action.payload)
        .flatMap(payload =>
            // Concat 2 observables so they fire sequentially
            Observable.concat(
                Observable.of(appActions.setRequest({
                    requestName,
                    requestData: {
                        status: request.LOADING,
                        error: '',
                    },
                })),
                Observable.fromPromise(api.getRemoteVocabularies(payload))
                    //  .do(x => console.log('requestName', x))
                    .flatMap(data =>
                        // Concat 2 observables so they fire sequentially
                        Observable.concat(
                            Observable.of(appActions.setRequest({
                                requestName,
                                requestData: {
                                    status: request.DONE,
                                    error: '',
                                },
                            })),
                            Observable.of(actions.syncVocabularies(data)),
                            Observable.of(appActions.setRequest({
                                requestName,
                                requestData: {
                                    status: request.IDLE,
                                    error: '',
                                },
                            })),
                        )
                    )
                    .catch(err =>
                        Observable.concat(
                            Observable.of(appActions.setRequest({
                                requestName,
                                requestData: {
                                    status: request.DONE,
                                    error: err.status,
                                },
                            })),
                            Observable.of(appActions.setRequest({
                                requestName,
                                requestData: {
                                    status: request.IDLE,
                                    error: '',
                                },
                            })),
                        )
                    )
            )
        );
};

// GET_REMOTE_VOCABULARY
export const requestGetRemoteVocabulary = (action$, store) => {
    return action$
        .ofType(types.REQUEST_GET_REMOTE_VOCABULARY)
        .map(action => action.payload)
        .flatMap(vocabularyId =>
            // Concat 2 observables so they fire sequentially
            Observable.concat(
                Observable.fromPromise(api.getRemoteVocabulary(vocabularyId))
                    .flatMap(data =>
                        // Concat 2 observables so they fire sequentially
                        Observable.concat(
                            Observable.of(appActions.setRemoteVocabulary(data)),
                        )
                    )
            )
        );
};

// GET_REMOTE_VOCABULARY_PHRASES
export const requestGetRemoteVocabularyPhrases = (action$, store) => {
    return action$
        .ofType(types.REQUEST_GET_REMOTE_VOCABULARY_PHRASES)
        .map(action => action.payload)
        .do(x => console.log('requestGetRemoteVocabularyPhrases', x))
        .flatMap(vocabulary =>
            // Concat 2 observables so they fire sequentially
            Observable.concat(
                Observable.fromPromise(api.updateRemoteVocabularyPhrases(vocabulary.id))
                    .do(x => console.log('getRemoteVocabularyPhrase', x))
                    .flatMap(phrases =>
                        // Concat 2 observables so they fire sequentially
                        Observable.concat(
                            Observable.of(actions.populateRemoteVocabularyPhrases({
                                ...vocabulary,
                                phrases,
                            })),
                            Observable.of(appActions.setRemoteVocabulary(null)),
                        )
                    )
            )
        );
};

// SYNC_VOCABULARY
export const requestSyncVocabulary = (action$, store) => {
    const requestName = 'updateRemoteVocabulary';
    return action$
        .ofType(types.REQUEST_SYNC_VOCABULARY)
        .map(action => action.payload)
        .flatMap(payload =>
            // Concat 2 observables so they fire sequentially
            Observable.concat(
                Observable.of(appActions.setRequest({
                    requestName,
                    requestData: {
                        status: request.LOADING,
                        error: '',
                    },
                })),
                Observable.fromPromise(api.updateRemoteVocabulary(payload))
                    .do(x => console.log(requestName, x))
                    .flatMap(data =>
                        // Concat 2 observables so they fire sequentially
                        Observable.concat(
                            Observable.of(appActions.setRequest({
                                requestName,
                                requestData: {
                                    status: request.DONE,
                                    error: '',
                                },
                            })),
                            Observable.of(actions.syncVocabulary({
                                id: payload.id,
                            })),
                            Observable.of(appActions.setRemoteVocabulary(null)),
                            Observable.of(appActions.setRequest({
                                requestName,
                                requestData: {
                                    status: request.IDLE,
                                    error: '',
                                },
                            })),
                        )
                    )
                    .catch(err =>
                        Observable.concat(
                            Observable.of(appActions.setRequest({
                                requestName,
                                requestData: {
                                    status: request.DONE,
                                    error: err.status,
                                },
                            })),
                            Observable.of(appActions.setRequest({
                                requestName,
                                requestData: {
                                    status: request.IDLE,
                                    error: '',
                                },
                            })),
                        )
                    )
            )
        );
};

// IMPORT_VOCABULARY
export const requestImportVocabulary = (action$, store) => {
    return action$
        .ofType(types.REQUEST_IMPORT_VOCABULARY)
        .map(action => action.payload)
        .flatMap(payload =>
            // Concat 2 observables so they fire sequentially
            Observable.concat(
                Observable.fromPromise(api.addVocabulary(payload))
                    .flatMap(data =>
                        // Concat 2 observables so they fire sequentially
                        Observable.concat(
                            Observable.of(actions.importVocabulary(data)),
                        )
                    )
            )
        );
};

// ADD_VOCABULARY
export const requestAddVocabulary = (action$, store) => {
    return action$
        .ofType(types.REQUEST_ADD_VOCABULARY)
        .map(action => action.payload)
        .flatMap(payload =>
            // Concat 2 observables so they fire sequentially
            Observable.concat(
                Observable.fromPromise(api.addVocabulary(payload))
                    .flatMap(data =>
                        // Concat 2 observables so they fire sequentially
                        Observable.concat(
                            Observable.of(actions.addVocabulary(data)),
                        )
                    )
            )
        );
};


// EDIT_VOCABULARY
export const requestUpdateVocabulary = (action$, store) => {
    return action$
        .ofType(types.REQUEST_EDIT_VOCABULARY)
        .map(action => action.payload)
        .flatMap(payload =>
            // Concat 2 observables so they fire sequentially
            Observable.concat(
                Observable.fromPromise(api.updateVocabulary(payload))
                    .flatMap(data =>
                        // Concat 2 observables so they fire sequentially
                        Observable.concat(
                            Observable.of(actions.updateVocabulary(data)),
                        )
                    )
            )
        );
};

// DELETE_VOCABULARY
export const requestDeleteVocabulary = (action$, store) => {
    return action$
        .ofType(types.REQUEST_DELETE_VOCABULARY)
        .map(action => action.payload)
        .flatMap(vocabularyId =>
            // Concat 2 observables so they fire sequentially
            Observable.concat(
                Observable.fromPromise(api.deleteVocabulary(vocabularyId))
                    .flatMap(data =>
                        // Concat 2 observables so they fire sequentially
                        Observable.concat(
                            Observable.of(actions.deleteVocabulary(vocabularyId)),
                        )
                    )
            )
        );
};

// ADD_PHRASE
export const requestAddPhrase = (action$, store) => {
    return action$
        .ofType(types.REQUEST_ADD_PHRASE)
        .map(action => action.payload)
        .flatMap(payload =>
            // Concat 2 observables so they fire sequentially
            Observable.concat(
                Observable.fromPromise(api.addPhrase(payload))
                    .flatMap(data =>
                        // Concat 2 observables so they fire sequentially
                        Observable.concat(
                            Observable.of(actions.addPhrase(data)),
                        )
                    )
            )
        );
};

// EDIT_PHRASE
export const requestUpdatePhrase = (action$, store) => {
    return action$
        .ofType(types.REQUEST_EDIT_PHRASE)
        .map(action => action.payload)
        .flatMap(payload =>
            // Concat 2 observables so they fire sequentially
            Observable.concat(
                Observable.fromPromise(api.updatePhrase(payload))
                    .flatMap(data =>
                        // Concat 2 observables so they fire sequentially
                        Observable.concat(
                            Observable.of(actions.updatePhrase(data)),
                        )
                    )
            )
        );
};

// DELETE_PHRASE
export const requestDeletePhrase = (action$, store) => {
    return action$
        .ofType(types.REQUEST_DELETE_PHRASE)
        .map(action => action.payload)
        .flatMap(phraseId =>
            // Concat 2 observables so they fire sequentially
            Observable.concat(
                Observable.fromPromise(api.deletePhrase(phraseId))
                    .flatMap(data =>
                        // Concat 2 observables so they fire sequentially
                        Observable.concat(
                            Observable.of(actions.deletePhrase(phraseId)),
                        )
                    )
            )
        );
};
