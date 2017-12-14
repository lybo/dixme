import React, { Component } from 'react';
import './style.css';

class Vocabulary extends Component {
    constructor(props) {
        super(props);

        this.handleDeleteClick = this.handleDeleteClick.bind(this);
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
                    reference: 'ref',
                },
                vocabularyId: vocabulary.id,
            });

            this.newPhrase.focus();
            this.newPhrase.value = '';
            this.translation.value = '';
        };
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
            <div key={phrase.id}>
                {phrase.text}: {phrase.translation}
                <a
                    href="#"
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
            <div className="Vocabulary">
                <form onSubmit={this.handleSubmit()}>
                    <input type="text" name="newPhrase" ref={(newPhrase) => this.newPhrase = newPhrase} defaultValue="" />
                    <input type="text" name="translation" ref={(translation) => this.translation = translation} defaultValue="" />
                    <input type="submit" />
                </form>
                {vocabulary.phrases.map(this.renderPhraseListItem)}
            </div>
        );
    }
}

export default Vocabulary;
