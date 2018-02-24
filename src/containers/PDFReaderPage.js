import React from 'react';
import { connect } from 'react-redux';
import PDFReaderView from '../components/PDFReaderView';
import {
    requestUpdateVocabulary,
} from '../actions/vocabulary';
import {
    setSelectedPhrase,
    setPDFPath,
} from '../actions/app';
import { getPhraseModel } from '../reducers/phrase';

function PDFReaderPage ({
    navigate,
    vocabulary,
    pdfPath,
    selectedPhrase,
    setPDFPath,
    setSelectedPhrase,
    isVisible,
    onPageNumberChange,
    onPdfScrollPositionChange,
}) {
    return (
        <PDFReaderView
            vocabulary={vocabulary}
            pdfPath={pdfPath}
            selectedPhrase={selectedPhrase}
            onWebFileSystemChange={setPDFPath}
            onSelection={(selectedPhrase) => {
                setSelectedPhrase(selectedPhrase);
                navigate(`/vocabulary/${vocabulary.id}/phrase/${selectedPhrase.id}/pdf`);
            }}
            onEditClick={(selectedPhrase) => {
                setSelectedPhrase(selectedPhrase);
                navigate(`/vocabulary/${vocabulary.id}/phrase/${selectedPhrase.id}/pdf`);
            }}
            onPageNumberChange={(pageNumber) => onPageNumberChange(pageNumber, vocabulary.id)}
            onPdfScrollPositionChange={(position) => onPdfScrollPositionChange(position, vocabulary.id)}
            goBack={() => {
                navigate(`/vocabulary/${vocabulary.id}`);
            }}
            isVisible={isVisible}
        />
    );
}

export default connect(
    (state, ownProps) => {
        const vocabulary = state.vocabularies.find(v => v.id === ownProps.match.params.vocabularyId);
        const {
            pdfPath,
            selectedPhrase,
        } = state.app;
        return {
            vocabulary,
            pdfPath,
            selectedPhrase,
            isVisible: ownProps.isVisible,
        };
    },
    (dispatch, ownProps) => {
        const navigate = ownProps.history.push;
        return {
            navigate,
            setSelectedPhrase: (selectedPhrase) => {
                dispatch(setSelectedPhrase(selectedPhrase));
            },
            setPDFPath: (pdfPath) => {
                dispatch(setPDFPath(pdfPath));
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
    }
)(PDFReaderPage);
