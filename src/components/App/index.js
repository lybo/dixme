import React, { Component } from 'react';
import logo from './logo.svg';
import './style.css';
import Vocabularies from '../Vocabularies';
import Vocabulary from '../Vocabulary';
import VocabularyForm from '../VocabularyForm';
import ImportVocabularyForm from '../ImportVocabularyForm';

class App extends Component {
    constructor(props) {
        super(props);

        this.handleGoBack = this.handleGoBack.bind(this);
        this.handleImportVocabularyFormChange = this.handleImportVocabularyFormChange.bind(this);
        this.handlePageNumberChange = this.handlePageNumberChange.bind(this);
    }

    handleGoBack() {
        const { setVocabularySelected } = this.props;
        setVocabularySelected(null);
    }

    handleImportVocabularyFormChange(file) {
        const { addVocabulary } = this.props;
        addVocabulary(file);
    }

    handlePageNumberChange(pageNumber) {
        const { updateVocabulary, app } = this.props;
        updateVocabulary && updateVocabulary({
            id: app.selectedVocabulary,
            lastPageNumber: pageNumber,
        });
    }

    renderContent() {
        const {
            vocabularies,
            app,
            setVocabularySelected,
            addVocabulary,
            addPhrase,
            updatePhrase,
            deletePhrase,
        } = this.props;

        if (app.selectedVocabulary) {
            const vocabulary = vocabularies.find(v => v.id === app.selectedVocabulary);
            return (
                <div>
                    <Vocabulary
                        vocabulary={vocabulary}
                        onAddPhrase={addPhrase}
                        onUpdatePhrase={updatePhrase}
                        onDeleteClick={deletePhrase}
                        onGoBack={this.handleGoBack}
                        onPageNumberChange={this.handlePageNumberChange}
                    />
                </div>
            );
        } else {
            return (
                <div>
                    <VocabularyForm
                        onAddVocabulary={addVocabulary}
                    />
                    <ImportVocabularyForm
                        onChange={this.handleImportVocabularyFormChange}
                    />
                    <Vocabularies
                        vocabularies={vocabularies}
                        setVocabularySelected={setVocabularySelected}
                    />
                </div>
            );
        }
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">diXme</h1>
                </header>
                {this.renderContent()}
            </div>
        );
    }
}

export default App;
