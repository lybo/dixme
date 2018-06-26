import { connect } from 'react-redux';
import Game from '../components/Game/';
// import { getPhraseModel } from '../reducers/phrase';
import {
    requestDeletePhrase,
} from '../actions/vocabulary';
import {
    setSelectedPhrase,
} from '../actions/app';

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
            deletePhrase: (data) => {
                dispatch(requestDeletePhrase(data));
            },
            onEditClick: (selectedPhrase) => {
                dispatch(setSelectedPhrase(selectedPhrase));
                navigate(`/vocabulary/${ownProps.match.params.vocabularyId}/phrase/${selectedPhrase.id}/null`);
            },
        };
    },
)(Game);

