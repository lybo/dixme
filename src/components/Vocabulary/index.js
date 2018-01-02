import React, { Component } from 'react';
import './style.css';
import pdfjsLib from 'pdfjs-dist';
import WebFileSystem from '../WebFileSystem';
import PDFReader from '../PDFReader';
import PhraseListItem from '../PhraseListItem';
import PhraseForm from '../PhraseForm';
import { getPhraseModel } from '../../reducers/phrase';
import * as LAYOUT_TYPE from '../../constants/layout';

// https://stackoverflow.com/questions/19721439/download-json-object-as-a-file-from-browser

function downloadObjectAsJson(exportObj, exportName){
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

class Vocabulary extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pdfPath: null,
            selectedPhrase: getPhraseModel(),
            selectedPhraseId: null,
            isReferenceVisible: true,
            isPhraseFormVisible: false,
            layout: LAYOUT_TYPE.SIMPLE,
        };

        this.handleWebFileSystemChange = this.handleWebFileSystemChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancelClick = this.handleCancelClick.bind(this);
        this.handleSelection = this.handleSelection.bind(this);
        this.handleAnnotationClick = this.handleAnnotationClick.bind(this);
        this.handleShowAllButtonClick = this.handleShowAllButtonClick.bind(this);
        this.handleReferenceVisibilityToggle = this.handleReferenceVisibilityToggle.bind(this);
        this.handlePhraseFormVisibilityToggle = this.handlePhraseFormVisibilityToggle.bind(this);
        this.handleLayoutClick = this.handleLayoutClick.bind(this);
        this.handleExportClick = this.handleExportClick.bind(this);
        this.handlePageNumberChange = this.handlePageNumberChange.bind(this);
    }

    handleWebFileSystemChange(file) {
        const pdfPath = URL.createObjectURL(file);
        this.setState({
            pdfPath,
        });
    }

    handleSubmit(phrase) {
        const { vocabulary, onAddPhrase } = this.props;

        this.setState({
            selectedPhrase: getPhraseModel(),
            isPhraseFormVisible: false,
        });
        const currentDate = new Date().getTime();
        onAddPhrase && onAddPhrase({
            phrase: {
                ...phrase,
                id: currentDate.toString(),
            },
            vocabularyId: vocabulary.id,
        });

    }

    handleCancelClick() {
        this.setState({
            isPhraseFormVisible: false,
        });
    }

    handleSelection(text, pageTextContent) {
        const regexp = new RegExp(`[^.]*${text}[^.]*\.`, 'g');
        const result = pageTextContent.match(regexp, text);
        if (result && result[0]) {
            const currentDate = new Date().getTime();
            const reference = result[0].replace(text, `<b>${text}</b>`)
            this.setState({
                selectedPhrase: getPhraseModel({
                    id: currentDate.toString(),
                    text,
                    reference,
                }),
                isPhraseFormVisible: true,
            });
        }
    }

    handleAnnotationClick(selectedPhraseId) {
        this.setState({
            selectedPhraseId,
        });
    }

    handlePageNumberChange(pageNumber) {
        const { onPageNumberChange } = this.props;
        onPageNumberChange && onPageNumberChange(pageNumber);
    }

    renderPDFContent() {
        const { pdfPath } = this.state;
        if (!pdfPath) {
            return;
        }

        const { vocabulary } = this.props;
        return (
            <PDFReader
                pdfPath={pdfPath}
                vocabulary={vocabulary}
                onSelection={this.handleSelection}
                onAnnotationClick={this.handleAnnotationClick}
                onPageNumberChange={this.handlePageNumberChange}
            />
        );
    }

    renderPDF() {
        const { layout } = this.state;
        if (layout !== LAYOUT_TYPE.PDF) {
            return;
        }

        const { vocabulary } = this.props;
        return (
            <div className="vocabulary__pdf-reader">
                <WebFileSystem
                    onChange={this.handleWebFileSystemChange}
                    accept={'application/pdf'}
                />
                {this.renderPDFContent()}
            </div>
        );
    }

    renderTranslationLinks() {
        const { selectedPhrase } = this.state;
        const text = encodeURIComponent(selectedPhrase.text || '');
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
    }

    handleShowAllButtonClick() {
        this.setState({
            selectedPhraseId: null,
        });
    }

    handleReferenceVisibilityToggle() {
        this.setState({
            isReferenceVisible: !this.state.isReferenceVisible,
        });
    }

    handlePhraseFormVisibilityToggle() {
        this.setState({
            isPhraseFormVisible: !this.state.isPhraseFormVisible,
        });
    }

    renderShowAllButton() {
        const { selectedPhraseId } = this.state;
        if (!selectedPhraseId) {
            return null;
        }

        return (
            <button
                onClick={this.handleShowAllButtonClick}
                className="phrases-list__show-all-button"
            >
                Show All Phrases
            </button>
        );
    }

    renderPhrasesButtons() {
        return (
            <div className="phrases-list__phrases-buttons">
                <button
                    onClick={this.handlePhraseFormVisibilityToggle}
                    className="phrases-list__show-hide-phrase-form"
                >
                    Show/Hide Phrase Form
                </button>
                <button
                    onClick={this.handleReferenceVisibilityToggle}
                    className="phrases-list__show-hide-reference"
                >
                    Show/Hide Reference
                </button>
            </div>
        );
    }

    renderPhraseForm() {
        const { selectedPhrase, isPhraseFormVisible } = this.state;
        if (!isPhraseFormVisible) {
            return null;
        }
        return (
            <div className="vocabulary__form">
                <PhraseForm
                    phrase={selectedPhrase}
                    onCancelClick={this.handleCancelClick}
                    onSubmit={this.handleSubmit}
                />
                {this.renderTranslationLinks()}
            </div>
        );
    }

    renderPhrasesList() {
        const { selectedPhraseId, isReferenceVisible } = this.state;
        const { vocabulary, onDeleteClick } = this.props;
        return (
            <div className="vocabulary__phrases-list">
                {vocabulary.phrases
                        .filter(phrase => phrase)
                        .filter(phrase => {
                            if (!selectedPhraseId){
                                return true;
                            }

                            return phrase.id === selectedPhraseId;
                        })
                        .map((phrase) => {
                            return (
                                <PhraseListItem
                                    key={phrase.id}
                                    vocabulary={vocabulary}
                                    onDeleteClick={onDeleteClick}
                                    phrase={phrase}
                                    isReferenceVisible={isReferenceVisible}
                                />
                            );
                        })
                }
            </div>
        );
    }

    handleLayoutClick(layout) {
        return () => {
            this.setState({
                layout,
            });
        };
    }

    handleExportClick() {
        const { vocabulary } = this.props;
        downloadObjectAsJson(vocabulary, vocabulary.title);
    }

    render() {
        const { vocabulary, onGoBack  } = this.props;
        return (
            <div className="vocabulary">
                <div className="vocabulary__header">
                    <button
                        onClick={onGoBack}
                        className="vocabulary__go-back-button"
                    >
                        Go back
                    </button>
                    <h1>{vocabulary.title}</h1>
                    layout:
                    <button
                        className="vocabulary__layout-simple-button"
                        onClick={this.handleLayoutClick(LAYOUT_TYPE.SIMPLE)}
                    >
                        simple
                    </button>
                    <button
                        className="vocabulary__layout-pdf-button"
                        onClick={this.handleLayoutClick(LAYOUT_TYPE.PDF)}
                    >
                        pdf
                    </button>
                    |
                    <button
                        className="vocabulary__export-button"
                        onClick={this.handleExportClick}
                    >
                        export
                    </button>

                </div>
                <div className="vocabulary__content">
                    {this.renderPDF()}

                    <div className="vocabulary__content-list-form">
                        {this.renderPhraseForm()}

                        <div className="vocabulary__phrases-list-container">
                            {this.renderPhrasesButtons()}
                            {this.renderShowAllButton()}
                            {this.renderPhrasesList()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Vocabulary;
