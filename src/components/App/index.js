import React, { Component } from 'react';
import logo from './logo.svg';
import './style.css';
import Vocabularies from '../Vocabularies';
import Vocabulary from '../Vocabulary';
import VocabularyForm from '../VocabularyForm';

class App extends Component {
    renderContent() {
        const {
            vocabularies,
            app,
            setVocabularySelected,
            addVocabulary,
            addPhrase,
            deletePhrase,
        } = this.props;

        if (app.selectedVocabulary) {
            const vocabulary = vocabularies.find(v => v.id === app.selectedVocabulary);
            return (
                <div>
                    <Vocabulary
                        vocabulary={vocabulary}
                        onAddPhrase={addPhrase}
                        onDeleteClick={deletePhrase}
                    />
                </div>
            );
        } else {
            return (
                <div>
                    <VocabularyForm onAddVocabulary={addVocabulary} />
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
