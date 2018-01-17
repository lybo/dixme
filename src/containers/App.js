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
} from '../actions/vocabulary';

export default connect(
    (state) => {
        return {
            vocabularies: state.vocabularies,
            app: state.app,
        };
    },
    (dispatch) => {
        return {
            setVocabularySelected: (vocabularyId) => {
                dispatch(setVocabularySelected(vocabularyId));
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
        };
    }
)(App);
