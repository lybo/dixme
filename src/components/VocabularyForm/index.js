import React, { Component } from 'react';
import './style.css';

// [
//   "es",
//   "fr",
//   "it",
//   "pt",
//   "de",
//   "nl",
//   "sv",
//   "ru",
//   "pl",
//   "ro",
//   "cz",
//   "gr",
//   "tr",
//   "zh",
//   "ja",
//   "ko",
//   "ar"
// ]

class VocabularyForm extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        const { vocabulary, onAddVocabulary } = this.props;

        return (e) => {
            e.stopPropagation();
            e.preventDefault();
            const currentDate = new Date();
            onAddVocabulary && onAddVocabulary({
                id: currentDate.toString(),
                title: this.newVocabulary.value,
            });

            this.newVocabulary.focus();
            this.newVocabulary.value = '';
        };
    }

    render() {
        return (
            <div className="vocabulary-form">
                <form onSubmit={this.handleSubmit()}>
                    <label
                        htmlFor="new-vocabulary"
                        className="vocabulary-form__input-label"
                    >
                        Vocabulary
                    </label>
                    <input
                        type="text"
                        name="new-vocabulary"
                        id="new-vocabulary"
                        ref={(newVocabulary) => this.newVocabulary = newVocabulary}
                        className="vocabulary-form__text-input"
                        defaultValue="" />
                    <div className="vocabulary-form__buttons">
                        <button
                            className="vocabulary-form__cancel-button"
                            onClick={this.handleCancelClick}
                        >
                            Cancel
                        </button>
                        <input type="submit" className="vocabulary-form__submit-button" />
                    </div>
                </form>
            </div>
        );
    }
}

export default VocabularyForm;
