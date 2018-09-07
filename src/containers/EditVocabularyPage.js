import React, { Component } from 'react';
import { connect } from 'react-redux';
import VocabularyForm from '../components/VocabularyForm';
import {
  requestUpdateVocabulary,
} from '../actions/vocabulary';

class EditVocabularyPage extends Component {
  componentWillMount() {
    const {
      vocabulary,
    } = this.props;
    document.documentElement.scrollTop = vocabulary.pdfLastScrollPosition;
  }

  render() {
    const {
      navigate,
      vocabulary,
      updateVocabulary,
    } = this.props;

    return (
      <div className="vocabulary">
        <VocabularyForm
          vocabulary={vocabulary}
          onSubmit={updateVocabulary}
          onCancelClick={() => navigate(`/vocabulary/${vocabulary.id}`)}
        />
      </div>
    );
  }
}

export default connect(
  (state, ownProps) => {
    const { vocabularyId } = ownProps.match.params;
    const vocabulary = state.vocabularies.find(v => v.id === vocabularyId);
    return {
      vocabulary,
    };
  },
  (dispatch, ownProps) => {
    const { vocabularyId } = ownProps.match.params;
    const navigate = ownProps.history.push;
    return {
      navigate,
      updateVocabulary: (data) => {
        dispatch(requestUpdateVocabulary(data));
        navigate(`/vocabulary/${vocabularyId}`);
      },
    };
  },
)(EditVocabularyPage);
