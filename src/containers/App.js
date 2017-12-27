import { connect } from 'react-redux'
import App from '../components/App/';
import {
    setVocabularySelected,
    requestAddPhrase,
    requestDeletePhrase,
    requestAddVocabulary,
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
            addPhrase: (data) => {
                dispatch(requestAddPhrase(data));
            },
            deletePhrase: (data) => {
                dispatch(requestDeletePhrase(data));
            },
        };
    }
)(App);
