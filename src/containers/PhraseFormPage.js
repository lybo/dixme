import React, { Component } from 'react';
import { connect } from 'react-redux';
import PhraseForm from '../components/PhraseForm';
import PDFReaderView from '../components/PDFReaderView';
import {
    requestAddPhrase,
    requestUpdatePhrase,
    requestDeletePhrase,
} from '../actions/vocabulary';

class PhraseFormPage extends Component {
    componentWillMount() {
        const {
            vocabulary,
        } = this.props;
        document.documentElement.scrollTop = vocabulary.pdfLastScrollPosition;
    }

    renderTranslationLinks(phraseText) {
        const text = encodeURIComponent(phraseText || '');
        return (
            <div className="phrase-item__translation-links">
                <a
                    href={`http://www.wordreference.com/engr/${text}`}
                    target="_blank"
                    className="phrase-item__translation-link"
                >
                    wordreference
                </a>
                <a
                    href={`https://translate.google.gr/#en/el/${text}`}
                    target="_blank"
                    className="phrase-item__translation-link"
                >
                    google
                </a>
                <a
                    href={`http://www.bing.com/translator/?from=en&to=el&text=${text}`}
                    target="_blank"
                    className="phrase-item__translation-link"
                >
                    bing
                </a>
            </div>
        );
    };

    render() {
        const {
            // destination,
            selectedPhrase,
            // navigate,
            goBack,
            vocabulary,
            addPhrase,
            updatePhrase,
            deletePhrase,
        } = this.props;
        const pdfProps = {
            ...this.props,
            isVisible: false,
        };

        if (!selectedPhrase) {
            return null;
        }

        return (
            <div>
                <PDFReaderView {...pdfProps} />
                <div className="vocabulary__form">
                    <PhraseForm
                        phrase={selectedPhrase}
                        vocabulary={vocabulary}
                        onCancelClick={() => {
                            // navigate(`/vocabulary/${destination}${vocabulary.id}`);
                            goBack();
                        }}
                        onSubmit={(phrase) => {

                            if (selectedPhrase.id) {
                                updatePhrase && updatePhrase({
                                    phrase: {
                                        ...phrase,
                                        id: selectedPhrase.id,
                                    },
                                    vocabularyId: vocabulary.id,
                                });
                                // navigate(`/vocabulary/${destination}${vocabulary.id}`);
                                goBack();
                                return;
                            }

                            const currentDate = new Date().getTime();
                            addPhrase && addPhrase({
                                phrase: {
                                    ...phrase,
                                    id: currentDate.toString(),
                                },
                                vocabularyId: vocabulary.id,
                            });
                            // navigate(`/vocabulary/${destination}${vocabulary.id}`);
                            goBack();
                        }}
                        onDeleteClick={(phraseId) => {
                            deletePhrase({
                                phraseId,
                                vocabularyId: vocabulary.id,
                            });
                            // navigate(`/vocabulary/${destination}${vocabulary.id}`);
                            goBack();
                        }}
                    />
                    {this.renderTranslationLinks(selectedPhrase.text)}
                </div>
            </div>
        );
    }
}

export default connect(
    (state, ownProps) => {
        const { vocabularyId, returnPage } = ownProps.match.params;
        const vocabulary = state.vocabularies.find(v => v.id === vocabularyId);
        const destination = returnPage && returnPage !== 'null' ? `${returnPage}/` : '';
        return {
            vocabulary,
            destination,
            selectedPhrase: state.app.selectedPhrase,
        };
    },
    (dispatch, ownProps) => {
        // const navigate = ownProps.history.push;
        const goBack = ownProps.history.goBack;
        return {
            // navigate,
            goBack,
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
    },
)(PhraseFormPage);
