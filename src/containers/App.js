import { connect } from 'react-redux'
import App from '../components/App/';
import {
    setVocabularySelected,
    requestAddPhrase,
    requestUpdatePhrase,
    requestDeletePhrase,
    requestAddVocabulary,
    requestUpdateVocabulary,
    requestDeleteVocabulary,
    requestSyncVocabularies,
} from '../actions/vocabulary';

import {
    setPDFPath,
    setSelectedPhrase,
} from '../actions/app';
import { authActions } from '../reducers/auth/';

export default connect(
    (state) => {
        return {
            vocabularies: state.vocabularies,
            app: state.app,
            auth: state.auth,
        };
    },
    (dispatch) => {
        return {
            syncVocabularies: () => {
                dispatch(requestSyncVocabularies());
            },
            setVocabularySelected: (vocabularyId) => {
                dispatch(setVocabularySelected(vocabularyId));
            },
            setPDFPath: (pdfPath) => {
                dispatch(setPDFPath(pdfPath));
            },
            setSelectedPhrase: (phrase) => {
                dispatch(setSelectedPhrase(phrase));
            },
            addVocabulary: (data) => {
                dispatch(requestAddVocabulary(data));
            },
            updateVocabulary: (data) => {
                dispatch(requestUpdateVocabulary(data));
            },
            deleteVocabulary: (data) => {
                dispatch(requestDeleteVocabulary(data));
            },
            addPhrase: (data) => {
                dispatch(requestAddPhrase(data));
            },
            updatePhrase: (data) => {
                dispatch(requestUpdatePhrase(data));
            },
            deletePhrase: (data) => {
                dispatch(requestDeletePhrase(data));
            },
            loginSuccess: profile => dispatch(authActions.loginSuccess(profile)),
            loginError: error => dispatch(authActions.loginError(error)),
        };
    }
)(App);
