import React, { Component } from 'react';
import './style.css';
import pdfjsLib from 'pdfjs-dist';
import WebFileSystem from '../WebFileSystem';
import PDFReader from '../PDFReader';
import PhraseForm from '../PhraseForm';
import { getPhraseModel } from '../../reducers/phrase';
import * as LAYOUT_TYPE from '../../constants/layout';
import VocabularyPhraseList from '../VocabularyPhraseList';
import VocabularyPhraseListMenu from '../VocabularyPhraseListMenu';
import ButtonWithConfirmation from '../ButtonWithConfirmation';
import VocabularyForm from '../VocabularyForm';
import ISO6391 from 'iso-639-1';

// TODO: move it to utils
function downloadObjectAsJson(exportObj, exportName){
    var dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportObj));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', exportName + '.json');
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

class Vocabulary extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pdfPath: null,
            selectedPhrase: getPhraseModel(),
            selectedPhraseId: null, //TODO: remove it
            isReferenceVisible: true,
            layout: LAYOUT_TYPE.PHRASES_LIST,
        };

        this.handleWebFileSystemChange = this.handleWebFileSystemChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancelClick = this.handleCancelClick.bind(this);
        this.handleSelection = this.handleSelection.bind(this);
        this.handleReferenceVisibilityToggle = this.handleReferenceVisibilityToggle.bind(this);
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
        const { vocabulary, onAddPhrase, onUpdatePhrase } = this.props;
        const { selectedPhrase, layout } = this.state;

        this.setState({
            selectedPhrase: getPhraseModel(),
            layout: layout === LAYOUT_TYPE.PHRASE_FORM_MAIN ? LAYOUT_TYPE.PHRASES_LIST : LAYOUT_TYPE.PDF,
        });

        if (selectedPhrase.id) {
            onUpdatePhrase && onUpdatePhrase({
                phrase: {
                    ...phrase,
                    id: selectedPhrase.id,
                },
                vocabularyId: vocabulary.id,
            });
            return;
        }

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
        const { layout } = this.state;
        this.setState({
            selectedPhrase: getPhraseModel(),
            layout: layout === LAYOUT_TYPE.PHRASE_FORM_MAIN ? LAYOUT_TYPE.PHRASES_LIST : LAYOUT_TYPE.PDF,
        });
    }

    handleSelection(text, pageTextContent) {
        const regexp = new RegExp(`[^.]*${text}[^.]*\.`, 'g');
        const result = pageTextContent.match(regexp, text);
        if (result && result[0]) {
            const sourceReference = result[0].replace(text, `<b>${text}</b>`)
            this.setState({
                selectedPhrase: getPhraseModel({
                    text,
                    sourceReference,
                }),
                layout: LAYOUT_TYPE.PHRASE_FORM_PDF,
            });
        }
    }

    handlePageNumberChange(pageNumber) {
        const { onPageNumberChange } = this.props;
        onPageNumberChange && onPageNumberChange(pageNumber);
    }

    renderPDFContent() {
        const { pdfPath, layout } = this.state;
        if (!pdfPath) {
            return;
        }

        const { vocabulary, onPdfScrollPositionChange } = this.props;
        return (
            <PDFReader
                pdfPath={pdfPath}
                vocabulary={vocabulary}
                onSelection={this.handleSelection}
                onAnnotationClick={this.handleAnnotationClick}
                onEditClick={(selectedPhrase) => {
                    this.setState({
                        selectedPhrase,
                        layout: LAYOUT_TYPE.PHRASE_FORM_PDF,
                    });
                }}
                onPageNumberChange={this.handlePageNumberChange}
                onPdfScrollPositionChange={onPdfScrollPositionChange}
                layout={layout}
            />
        );
    }

    renderPDF() {
        const { layout } = this.state;
        const { vocabulary } = this.props;
        return (
            <div
                className="vocabulary__pdf-reader"
                 style={{ display: layout === LAYOUT_TYPE.PDF ? 'block' : 'none' }}
            >
                <div className="vocabulary__pdf-reader-header">
                    <div className="vocabulary__pdf-reader-header-left">
                        <button
                            className="vocabulary__pdf-reader-back-button"
                            onClick={()=> {
                                this.setState({
                                    layout: LAYOUT_TYPE.PHRASES_LIST,
                                });
                            }}
                        >
                            &#8592;
                        </button>
                    </div>
                    <div className="vocabulary__pdf-reader-header-center">
                        <h1 className="vocabulary__pdf-reader-vocabulary-title">{vocabulary.title}</h1>
                    </div>
                    <div className="vocabulary__pdf-reader-header-right">
                    </div>
                </div>
                <div className="vocabulary__pdf-reader-buttons">
                    <div className="vocabulary__pdf-reader-upload-button">
                        <WebFileSystem
                            onChange={this.handleWebFileSystemChange}
                            accept={'application/pdf'}
                        />
                    </div>
                </div>
                {this.renderPDFContent()}
            </div>
        );
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
    }

    handleReferenceVisibilityToggle() {
        this.setState({
            isReferenceVisible: !this.state.isReferenceVisible,
        });
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
        const { selectedPhrase, layout } = this.state;
        const { vocabulary, onDeletePhrase } = this.props;

        return (
            <div className="vocabulary__form">
                <PhraseForm
                    phrase={selectedPhrase}
                    vocabulary={vocabulary}
                    onCancelClick={this.handleCancelClick}
                    onSubmit={this.handleSubmit}
                    onDeleteClick={(phraseId) => {
                        onDeletePhrase({
                            phraseId,
                            vocabularyId: vocabulary.id,
                        });
                        this.setState({
                            layout: layout === LAYOUT_TYPE.PHRASE_FORM_MAIN ? LAYOUT_TYPE.PHRASES_LIST : LAYOUT_TYPE.PDF,
                        });
                    }}
                />
                {this.renderTranslationLinks(selectedPhrase.text)}
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

    renderPhrasesList() {
        const { selectedPhraseId, isReferenceVisible } = this.state;
        const { vocabulary, onDelete, onDeletePhrase, onGoBack } = this.props;
        return (
            <div className="vocabulary__phrases-list">

                <h1>{vocabulary.title}</h1>
                {ISO6391.getName(vocabulary.langFrom)} -> {ISO6391.getName(vocabulary.langTo)}<br/><br/>

                <div style={{display: 'flex', padding: '0 10px'}}>
                    <button
                        className="vocabulary__edit-button"
                        onClick={() => {
                            this.setState({
                                layout: LAYOUT_TYPE.VOCABULARY_FORM,
                            });
                        }}
                    >
                        edit
                    </button>
                </div>

                <div className="vocabulary__delete-button">
                    <ButtonWithConfirmation
                        label="delete"
                        confirmationMessage="Do you want to delete this vocabulary?"
                        onConfirm={() => onDelete(vocabulary.id)}
                        buttonClassName=""
                    />
                </div>

                {this.renderPhrasesButtons()}

                <VocabularyPhraseList
                    vocabulary={vocabulary}
                    onDeleteClick={onDeletePhrase}
                    onEditClick={(phraseId) => {
                        this.setState({
                            selectedPhrase: vocabulary.phrases.find(phrase => phrase.id === phraseId),
                            layout: LAYOUT_TYPE.PHRASE_FORM_MAIN,
                        });
                    }}
                    selectedPhraseId={selectedPhraseId}
                    isReferenceVisible={isReferenceVisible}
                />

                <VocabularyPhraseListMenu
                    primaryButtons={[
                        {
                            label: 'home',
                            onClick: onGoBack,
                        },
                        {
                            label: 'pdf',
                            onClick: this.handleLayoutClick(LAYOUT_TYPE.PDF),
                        },
                        {
                            label: 'add phrase',
                            onClick: () => {
                                this.setState({
                                    layout: LAYOUT_TYPE.PHRASE_FORM_MAIN,
                                });
                            },
                        },
                        {
                            label: 'export',
                            onClick: this.handleExportClick,
                        },
                    ]}
                />
            </div>
        );
    }

    render() {
        const { layout } = this.state;
        const { vocabulary, onUpdate } = this.props;

        if (layout === LAYOUT_TYPE.PHRASE_FORM_MAIN || layout === LAYOUT_TYPE.PHRASE_FORM_PDF) {
            return (
                <div className="vocabulary">
                    {this.renderPDF()}
                    <div className="vocabulary__content">
                        <div className="vocabulary__content-list-form">
                            {this.renderPhraseForm()}
                        </div>
                    </div>
                </div>
            );
        }

        if (layout === LAYOUT_TYPE.PDF) {
            document.documentElement.scrollTop = vocabulary.pdfLastScrollPosition;
            return (
                <div className="vocabulary">
                    {this.renderPDF()}
                </div>
            );
        }

        if (layout === LAYOUT_TYPE.VOCABULARY_FORM) {
            document.documentElement.scrollTop = vocabulary.pdfLastScrollPosition;
            return (
                <div className="vocabulary">
                    {this.renderPDF()}
                    <VocabularyForm
                        vocabulary={vocabulary}
                        onSubmit={(data) => {
                          onUpdate(data);
                          this.setState({
                            layout: LAYOUT_TYPE.PHRASES_LIST,
                          });
                        }}
                        onCancelClick={() => {
                          this.setState({
                            layout: LAYOUT_TYPE.PHRASES_LIST,
                          });
                        }}
                    />
                </div>
            );
        }

        if (layout === LAYOUT_TYPE.PHRASES_LIST) {
            return (
                <div className="vocabulary">
                    {this.renderPDF()}
                    <div className="vocabulary__content">

                        <div className="vocabulary__content-list-form">

                            <div className="vocabulary__phrases-list-container">
                                {this.renderPhrasesList()}
                            </div>
                        </div>

                    </div>
                </div>
            );
        }
    }
}

export default Vocabulary;
