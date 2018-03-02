import React, { Component } from 'react';
import './style.css';
import { getPhraseModel } from '../../reducers/phrase';
import * as LAYOUT_TYPE from '../../constants/layout';
import VocabularyPhraseList from '../VocabularyPhraseList';
import VocabularyPhraseListMenu from '../VocabularyPhraseListMenu';
import ButtonWithConfirmation from '../ButtonWithConfirmation';
import ISO6391 from 'iso-639-1';

// TODO: move it to utils
function downloadObjectAsJson(exportObj, exportName){
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportObj));
    const container = document.getElementById('root');
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', exportName + '.json');
    container.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

class Vocabulary extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pdfPath: null,
            selectedPhrase: getPhraseModel(),
            isReferenceVisible: true,
            layout: LAYOUT_TYPE.PHRASES_LIST,
        };

        this.handleReferenceVisibilityToggle = this.handleReferenceVisibilityToggle.bind(this);
        this.handleExportClick = this.handleExportClick.bind(this);
        this.handlePageNumberChange = this.handlePageNumberChange.bind(this);
    }

    handlePageNumberChange(pageNumber) {
        const { onPageNumberChange } = this.props;
        onPageNumberChange && onPageNumberChange(pageNumber);
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

    handleExportClick() {
        const { vocabulary } = this.props;
        downloadObjectAsJson(vocabulary, vocabulary.title);
    }

    render() {
        const { isReferenceVisible } = this.state;
        const {
            vocabulary,
            deleteVocabulary,
            onEditClick,
            onAddClick,
            deletePhrase,
            navigate,
        } = this.props;

        if (!vocabulary) {
            return null;
        }

        return (
            <div className="vocabulary">
                <div className="vocabulary__content">

                    <div className="vocabulary__content-list-form">

                        <div className="vocabulary__phrases-list-container">
                            <div className="vocabulary__phrases-list">

                                <h1>{vocabulary.title}</h1>
                                {ISO6391.getName(vocabulary.langFrom)} -> {ISO6391.getName(vocabulary.langTo)}<br/><br/>

                                <div style={{display: 'flex', padding: '0 10px'}}>
                                    <button
                                        className="vocabulary__edit-button"
                                        onClick={() => navigate(`/vocabulary/edit/${vocabulary.id}`)}
                                    >
                                        edit
                                    </button>
                                </div>

                                <div className="vocabulary__delete-button">
                                    <ButtonWithConfirmation
                                        label="delete"
                                        confirmationMessage="Do you want to delete this vocabulary?"
                                        onConfirm={() => deleteVocabulary(vocabulary.id)}
                                        buttonClassName=""
                                    />
                                </div>

                                {this.renderPhrasesButtons()}

                                <VocabularyPhraseList
                                    vocabulary={vocabulary}
                                    onDeleteClick={deletePhrase}
                                    onEditClick={(phraseId) => {
                                        onEditClick && onEditClick(vocabulary.phrases.find(phrase => phrase.id === phraseId));
                                    }}
                                    isReferenceVisible={isReferenceVisible}
                                />

                            <VocabularyPhraseListMenu
                                primaryButtons={[
                                    {
                                        label: 'home',
                                        onClick: () => navigate(`/`),
                                    },
                                    {
                                        label: 'pdf',
                                        onClick: () => navigate(`/vocabulary/pdf/${vocabulary.id}`),
                                    },
                                    {
                                        label: 'add phrase',
                                        onClick: () => onAddClick(),
                                    },
                                    {
                                        label: 'export',
                                        onClick: this.handleExportClick,
                                    },
                                ]}
                            />
                        </div>
                    </div>
                </div>

            </div>
        </div>
        );
    }
}

export default Vocabulary;
