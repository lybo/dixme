import React, { Component } from 'react';
import './style.css';
import ISO6391 from 'iso-639-1';

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
        this.handleCancelClick = this.handleCancelClick.bind(this);
    }

    handleSubmit() {
        const { vocabulary, onSubmit } = this.props;

        return (e) => {
            e.stopPropagation();
            e.preventDefault();
            const currentDate = new Date();
            onSubmit && onSubmit({
                id: vocabulary ? vocabulary.id : currentDate.toString(),
                title: this.newVocabulary.value,
                langFrom: this.langFrom.value,
                langTo: this.langTo.value,
            });

            this.newVocabulary.focus();
            this.newVocabulary.value = '';
        };
    }

    handleCancelClick(evt) {
        evt.preventDefault();
        const { onCancelClick } = this.props;

        this.newVocabulary.focus();
        this.newVocabulary.value = '';
        onCancelClick && onCancelClick();
    }

    render() {
        const { vocabulary } = this.props;

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
                        defaultValue={vocabulary.title || ''} />
                    <label
                        htmlFor="langFrom"
                        className="vocabulary-form__input-label"
                    >
                        translation from:
                    </label>
                    <select
                        type="text"
                        name="langFrom"
                        id="langFrom"
                        ref={(langFrom) => this.langFrom = langFrom}
                        className="vocabulary-form__text-input"
                        defaultValue={vocabulary.langFrom || ''}
                    >

                        <option value="">Select language</option>
                        {ISO6391.getLanguages(ISO6391.getAllCodes()).map((item) => {
                            return (
                                <option key={item.code} value={item.code}>{item.name}</option>
                            );
                        })}
                    </select>
                    <label
                        htmlFor="langTo"
                        className="vocabulary-form__input-label"
                    >
                        translation to:
                    </label>
                    <select
                        type="text"
                        name="langTo"
                        id="langTo"
                        ref={(langTo) => this.langTo = langTo}
                        className="vocabulary-form__text-input"
                        defaultValue={vocabulary.langTo || ''}
                    >

                        <option value="">Select language</option>
                        {ISO6391.getLanguages(ISO6391.getAllCodes()).map((item) => {
                            return (
                                <option key={item.code} value={item.code}>{item.name}</option>
                            );
                        })}
                    </select>
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
