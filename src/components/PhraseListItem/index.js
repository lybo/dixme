import React, { Component } from 'react';
import './style.css';
import ButtonWithConfirmation from '../ButtonWithConfirmation';
import TextToSpeechButton from '../TextToSpeechButton';

class PhraseListItem extends Component {
    constructor(props) {
        super(props);

        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
    }

    handleEditClick(phraseId) {
        const { onEditClick } = this.props;
        return (e) => {
            e.stopPropagation();
            e.preventDefault();

            onEditClick && onEditClick(phraseId);
        }
    }

    handleDeleteClick(phraseId) {
        const { vocabulary, onDeleteClick } = this.props;

        return () => {
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
                dangerouslySetInnerHTML={{__html: `... ${phrase.sourceReference} ...`}}
            />
        );
    }

    render() {
        const { phrase, lang } = this.props;

        return (
            <div
                className="phrase-item"
                key={phrase.id}
            >
                <div className="phrase-item__content">
                    <div className="phrase-item__text">{phrase.text}</div>
                    <div className="phrase-item__translation">{phrase.translationFrom} ({phrase.translationFromType}) - {phrase.translationTo}</div>
                    {/* <div className="phrase-item__definition">{`(${phrase.definition})`}</div> */}
                    {this.renderReference()}
                </div>
                <div className="phrase-item__buttons">
                    <TextToSpeechButton
                        text={phrase.text}
                        classNames="phrase-item__edit"
                        lang={lang}
                    />
                    <button
                        className="phrase-item__edit"
                        onClick={this.handleEditClick(phrase.id)}
                    >
                        edit
                    </button>
                    <ButtonWithConfirmation
                        label="delete"
                        confirmationMessage="Do you want to delete this phrase?"
                        onConfirm={this.handleDeleteClick(phrase.id)}
                        buttonClassName="phrase-item__delete"
                    />
                </div>
            </div>
        );
    }
}

export default PhraseListItem;

