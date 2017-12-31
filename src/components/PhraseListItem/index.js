import React, { Component } from 'react';
import './style.css';

class PhraseListItem extends Component {
    constructor(props) {
        super(props);

        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
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

    renderReference() {
        const { phrase, isReferenceVisible } = this.props;

        if (!isReferenceVisible) {
            return null;
        }

        return (
            <div
                className="phrase-item__reference"
                dangerouslySetInnerHTML={{__html: `... ${phrase.reference} ...`}}
            />
        );
    }

    render() {
        const { phrase } = this.props;

        return (
            <div
                className="phrase-item"
                key={phrase.id}
            >
                <div className="phrase-item__text">{phrase.text}</div>
                <div className="phrase-item__translation">{phrase.translation}</div>
                <div className="phrase-item__definition">{`(${phrase.definition})`}</div>
                {this.renderReference()}
                <div className="phrase-item__buttons">
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
            </div>
        );
    }
}

export default PhraseListItem;

