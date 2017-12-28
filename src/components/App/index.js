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
                    <Vocabulary vocabulary={vocabulary} onAddPhrase={addPhrase} onDeleteClick={deletePhrase} />
                </div>
            );
        } else {
            return (
                <div>
                    <Vocabularies vocabularies={vocabularies} setVocabularySelected={setVocabularySelected} />
                    <VocabularyForm onAddVocabulary={addVocabulary} />
                </div>
            );
        }
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React aaaa</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                {/* <canvas id="pdf-canvas" width="800"></canvas> */}
                {this.renderContent()}
            </div>
        );
    }
}

export default App;
