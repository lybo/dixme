import * as api from '../services/index'
import * as actions from '../actions/vocabulary'
import * as types from '../constants/vocabulary'
import { Observable } from 'rxjs/Observable'


//POPULATE_VOCABULARIES
export const requestPopulateVocabularies = (action$, store) => {
    return action$
        .ofType(types.REQUEST_POPULATE_VOCABULARIES)
        .map(action => action.payload)
        .flatMap(payload =>
            //Concat 2 observables so they fire sequentially
            Observable.concat(
                Observable.fromPromise(api.getVocabularies(payload))
                    .flatMap(data =>
                        //Concat 2 observables so they fire sequentially
                        Observable.concat(
                            Observable.of(actions.populateVocabularies(data)),
                        )
                    )
            )
        );
};

//ADD_VOCABULARY
export const requestAddVocabulary = (action$, store) => {
    return action$
        .ofType(types.REQUEST_ADD_VOCABULARY)
        .map(action => action.payload)
        .flatMap(payload =>
            //Concat 2 observables so they fire sequentially
            Observable.concat(
                Observable.fromPromise(api.addVocabulary(payload))
                    .flatMap(data =>
                        //Concat 2 observables so they fire sequentially
                        Observable.concat(
                            Observable.of(actions.addVocabulary(data)),
                        )
                    )
            )
        );
};


//EDIT_VOCABULARY
export const requestUpdateVocabulary = (action$, store) => {
    return action$
        .ofType(types.REQUEST_EDIT_VOCABULARY)
        .map(action => action.payload)
        .flatMap(payload =>
            //Concat 2 observables so they fire sequentially
            Observable.concat(
                Observable.fromPromise(api.updateVocabulary(payload))
                    .flatMap(data =>
                        //Concat 2 observables so they fire sequentially
                        Observable.concat(
                            Observable.of(actions.updateVocabulary(data)),
                        )
                    )
            )
        );
};

//DELETE_VOCABULARY
export const requestDeleteVocabulary = (action$, store) => {
    return action$
        .ofType(types.REQUEST_DELETE_VOCABULARY)
        .map(action => action.payload)
        .flatMap(vocabularyId =>
            //Concat 2 observables so they fire sequentially
            Observable.concat(
                Observable.fromPromise(api.deleteVocabulary(vocabularyId))
                    .flatMap(data =>
                        //Concat 2 observables so they fire sequentially
                        Observable.concat(
                            Observable.of(actions.deleteVocabulary(vocabularyId)),
                        )
                    )
            )
        );
};

//ADD_PHRASE
export const requestAddPhrase = (action$, store) => {
    return action$
        .ofType(types.REQUEST_ADD_PHRASE)
        .map(action => action.payload)
        .flatMap(payload =>
            //Concat 2 observables so they fire sequentially
            Observable.concat(
                Observable.fromPromise(api.addPhrase(payload))
                    .flatMap(data =>
                        //Concat 2 observables so they fire sequentially
                        Observable.concat(
                            Observable.of(actions.addPhrase(data)),
                        )
                    )
            )
        );
};


//EDIT_PHRASE
export const requestUpdatePhrase = (action$, store) => {
    return action$
        .ofType(types.REQUEST_EDIT_PHRASE)
        .map(action => action.payload)
        .flatMap(payload =>
            //Concat 2 observables so they fire sequentially
            Observable.concat(
                Observable.fromPromise(api.updatePhrase(payload))
                    .flatMap(data =>
                        //Concat 2 observables so they fire sequentially
                        Observable.concat(
                            Observable.of(actions.updatePhrase(data)),
                        )
                    )
            )
        );
};

//DELETE_PHRASE
export const requestDeletePhrase = (action$, store) => {
    return action$
        .ofType(types.REQUEST_DELETE_PHRASE)
        .map(action => action.payload)
        .flatMap(phraseId =>
            //Concat 2 observables so they fire sequentially
            Observable.concat(
                Observable.fromPromise(api.deletePhrase(phraseId))
                    .flatMap(data =>
                        //Concat 2 observables so they fire sequentially
                        Observable.concat(
                            Observable.of(actions.deletePhrase(phraseId)),
                        )
                    )
            )
        );
};
