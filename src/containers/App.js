import { connect } from 'react-redux'
import { setVocabularySelected, addPhrase, deletePhrase } from '../actions/vocabulary';
import App from '../components/App/';

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
            addPhrase: (data) => {
                dispatch(addPhrase(data));
            },
            deletePhrase: (data) => {
                dispatch(deletePhrase(data));
            },
        };
    }
)(App);
