import { connect } from 'react-redux'
import { setVocabularySelected, deletePhrase } from '../actions/vocabulary';
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
            deletePhrase: (data) => {
                dispatch(deletePhrase(data));
            }
        };
    }
)(App);
