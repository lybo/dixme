import { connect } from 'react-redux';
import Game from '../components/Game/';
// import { getPhraseModel } from '../reducers/phrase';
// import {
//     requestAddPhrase,
//     requestUpdatePhrase,
//     requestDeletePhrase,
//     requestAddVocabulary,
//     requestUpdateVocabulary,
//     requestDeleteVocabulary,
//     requestGetRemoteVocabulary,
//     requestSyncVocabulary,
//     requestGetRemoteVocabularyPhrases,
// } from '../actions/vocabulary';
// import {
//     setSelectedPhrase,
//     setRemoteVocabulary,
// } from '../actions/app';

export default connect(
    (state, ownProps) => {
        const vocabulary = state.vocabularies.find(v => v.id === ownProps.match.params.vocabularyId);
        return {
            vocabulary,
        };
    },
    (dispatch, ownProps) => {
        const navigate = ownProps.history.push;
        return {
            navigate,
        };
    },
)(Game);

