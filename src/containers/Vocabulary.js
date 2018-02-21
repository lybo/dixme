import React from 'react';
import { connect } from 'react-redux';
import Vocabulary from '../components/Vocabulary/';
import { getPhraseModel } from '../reducers/phrase';
import {
    setVocabularySelected,
    requestAddPhrase,
    requestUpdatePhrase,
    requestDeletePhrase,
    requestAddVocabulary,
    requestUpdateVocabulary,
    requestDeleteVocabulary,
} from '../actions/vocabulary';
import {
    setSelectedPhrase,
} from '../actions/app';

function VocabularyContainer (props) {
    return (
        <Vocabulary {...props} />
    );
}

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
            addVocabulary: (data) => {
                dispatch(requestAddVocabulary(data));
            },
            updateVocabulary: (data) => {
                dispatch(requestUpdateVocabulary(data));
            },
            deleteVocabulary: (data) => {
                dispatch(requestDeleteVocabulary(data));
                navigate(`/`);
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
            goToAddPhrase: () => {
                navigate(`/vocabulary/${ownProps.match.params.vocabularyId}/phrase/0/null`);
            },
            onEditClick: (selectedPhrase) => {
                dispatch(setSelectedPhrase(selectedPhrase));
                navigate(`/vocabulary/${ownProps.match.params.vocabularyId}/phrase/${selectedPhrase.id}/null`);
            },
            onAddClick: () => {
                dispatch(setSelectedPhrase(getPhraseModel()));
                navigate(`/vocabulary/${ownProps.match.params.vocabularyId}/phrase/0/null`);
            },
            onPageNumberChange: (pageNumber, vocabularyId) => {
                dispatch(requestUpdateVocabulary({
                    id: vocabularyId,
                    lastPageNumber: pageNumber,
                }));
            },
            onPdfScrollPositionChange: (position, vocabularyId) => {
                dispatch(requestUpdateVocabulary({
                    id: vocabularyId,
                    pdfLastScrollPosition: position,
                }));
            },
        };
    },
)(VocabularyContainer);

