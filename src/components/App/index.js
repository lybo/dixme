import React, { Component } from 'react';
import logo from './logo.svg';
import './style.css';
import Vocabularies from '../Vocabularies';
import Vocabulary from '../Vocabulary';

class App extends Component {
    renderContent() {
        const { vocabularies, app, setVocabularySelected, deletePhrase } = this.props;

        if (app.selectedVocabulary) {
            const vocabulary = vocabularies.find(v => v.id === app.selectedVocabulary);
            return (
                <Vocabulary vocabulary={vocabulary} onDeleteClick={deletePhrase} />
            );
        } else {
            return (
                <Vocabularies vocabularies={vocabularies} setVocabularySelected={setVocabularySelected} />
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
                {this.renderContent()}
            </div>
        );
    }
}

export default App;
