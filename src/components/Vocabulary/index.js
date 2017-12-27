import React, { Component } from 'react';
import './style.css';

class Vocabulary extends Component {
    constructor(props) {
        super(props);

        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderPhraseListItem = this.renderPhraseListItem.bind(this);
    }

    handleSubmit() {
        const { vocabulary, onAddPhrase } = this.props;

        return (e) => {
            e.stopPropagation();
            e.preventDefault();
            const currentDate = new Date();
            onAddPhrase && onAddPhrase({
                phrase: {
                    id: currentDate.toString(),
                    text: this.newPhrase.value,
                    translation: this.translation.value,
                    reference: this.reference.value,
                    definition: this.definition.value,
                },
                vocabularyId: vocabulary.id,
            });

            this.newPhrase.focus();
            this.newPhrase.value = '';
            this.translation.value = '';
            this.reference.value = '';
            this.definition.value = '';
        };
    }

    handleEditClick(phraseId) {
        return (e) => {
            e.stopPropagation();
            e.preventDefault();
        }
    }

    handleDeleteClick(phraseId) {
        const { vocabulary, onDeleteClick } = this.props;

        return (e) => {
            e.stopPropagation();
            e.preventDefault();
            onDeleteClick && onDeleteClick({
                phraseId,
                vocabularyId: vocabulary.id,
            });
        }
    }

    renderPhraseListItem(phrase) {
        return (
            <div
                className="phrase-item"
                key={phrase.id}
            >
                <div className="phrase-item__text">{phrase.text}</div>
                <div className="phrase-item__translation">{phrase.translation}</div>
                <div className="phrase-item__definition">{`(${phrase.definition})`}</div>
                <div
                    className="phrase-item__reference"
                    dangerouslySetInnerHTML={{__html: `... ${phrase.reference} ...`}} />
                <a
                    href="#"
                    className="phrase-item__edit"
                    onClick={this.handleEditClick(phrase.id)}
                >
                    edit
                </a>
                <a
                    href="#"
                    className="phrase-item__delete"
                    onClick={this.handleDeleteClick(phrase.id)}
                >
                    delete
                </a>
            </div>
        );
    }

    render() {
        const { vocabulary } = this.props;
        return (
            <div className="vocabulary-form">
                <form onSubmit={this.handleSubmit()}>
                    <label>Phrase</label>
                    <input type="text" name="newPhrase" ref={(newPhrase) => this.newPhrase = newPhrase} defaultValue="" className="vocabulary-form__text-input" />
                    <br />
                    <label>Translation</label>
                    <input type="text" name="translation" ref={(translation) => this.translation = translation} defaultValue="" className="vocabulary-form__text-input" />
                    <br />
                    <label>Reference</label>
                    <input type="text" name="reference" ref={(reference) => this.reference = reference} defaultValue="" className="vocabulary-form__text-input" />
                    <br />
                    <label>Defintion</label>
                    <input type="text" name="definition" ref={(definition) => this.definition = definition} defaultValue="" className="vocabulary-form__text-input" />
                    <input type="submit" className="vocabulary-form__submit-button" />
                </form>
                {vocabulary.phrases.map(this.renderPhraseListItem)}
            </div>
        );
    }
}

export default Vocabulary;
