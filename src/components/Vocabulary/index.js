import React, { Component } from 'react';
import './style.css';

class Vocabulary extends Component {
    constructor(props) {
        super(props);

        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.renderPhraseListItem = this.renderPhraseListItem.bind(this);
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
                >delete</a>
            </div>
        );
    }

    render() {
        const { vocabulary } = this.props;
        return (
            <div className="Vocabulary">
                {vocabulary.phrases.map(this.renderPhraseListItem)}
            </div>
        );
    }
}

export default Vocabulary;
