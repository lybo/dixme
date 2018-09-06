import React, { Component } from 'react';
import './style.css';
import ISO6391 from 'iso-639-1';
import TextInput from '../Form/TextInput';
import SelectInput from '../Form/SelectInput';

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
// ['en', 'es', 'fr', 'it', 'pt', 'de', 'nl', 'sv', 'ru', 'pl', 'ro', 'cz', 'gr', 'tr', 'zh', 'ja', 'ko', 'ar']


const options = ISO6391.getLanguages(ISO6391.getAllCodes()).map((item) => ({
    label: item.name,
    value: item.code,
}));
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
            const currentDate = new Date().getTime();
            const validVocabulary = vocabulary && vocabulary.id;
            const id = validVocabulary ? vocabulary.id : currentDate.toString();
            onSubmit && onSubmit({
                id,
                title: this.newVocabulary.value,
                langFrom: this.langFrom.value,
                langTo: this.langTo.value,
            });

            if (!validVocabulary) {
                this.newVocabulary.focus();
                this.newVocabulary.value = '';
            }
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
                    <TextInput
                        id="new-vocabulary"
                        name="new-vocabulary"
                        label="Vocabulary name"
                        inputRef={(newVocabulary) => this.newVocabulary = newVocabulary}
                        defaultValue={vocabulary.title || ''}
                    />
                    <SelectInput
                        id="langFrom"
                        name="langFrom"
                        label="Translation from"
                        inputRef={(langFrom) => this.langFrom = langFrom}
                        defaultValue={vocabulary.langFrom || ''}
                        emptyOptionText="Select language"
                        options={options}
                    />
                    <SelectInput
                        id="langTo"
                        name="langTo"
                        label="Translation To"
                        inputRef={(langTo) => this.langTo = langTo}
                        defaultValue={vocabulary.langTo || ''}
                        emptyOptionText="Select language"
                        options={options}
                    />
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
