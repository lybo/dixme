import React, { Component } from 'react';
import  TagsInput  from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'
import './style.css';
import ButtonWithConfirmation from '../ButtonWithConfirmation';
import { translate } from '../../services/translation/';

const wordreferenceCodeLanguagesAPI = {
    'en': 'en',
    'es': 'es',
    'fr': 'fr',
    'it': 'it',
    'pt': 'pt',
    'de': 'de',
    'nl': 'nl',
    'sv': 'sv',
    'ru': 'ru',
    'pl': 'pl',
    'ro': 'ro',
    'cs': 'cz',
    'el': 'gr',
    'tr': 'tr', // it doesn't work
    'zh': 'zh',
    'ja': 'ja',
    'ko': 'ko',
    'ar': 'ar',
};

const supportedCodeLanguages = Object.keys(wordreferenceCodeLanguagesAPI);
const getSupportedLanguage = (code) => {
    return supportedCodeLanguages.includes(code) ? wordreferenceCodeLanguagesAPI[code] : null;
};

class PhraseForm extends Component {
    constructor(props) {
        super(props);

        const {
            id,
            text,
            stemmedText,
            sourceReference,
            translationFrom,
            translationFromType,
            translationTo,
            translationReference,
            definition,
            definitionReference,
        } = this.props.phrase || {};

        this.state = {
            id,
            text,
            stemmedText,
            sourceReference,
            translationFrom: translationFrom || text,
            translationFromType,
            translationTo: translationTo.split(',').map(word => word.trim()).filter(word => word),
            translationReference,
            definition,
            definitionReference,
            translations: [],
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancelClick = this.handleCancelClick.bind(this);
    }

    componentWillMount() {
        const { vocabulary } = this.props;

        const langFrom = getSupportedLanguage(vocabulary.langFrom) || 'en';
        const langTo = getSupportedLanguage(vocabulary.langTo) || 'el';

        if ([langFrom, langTo].includes('en')) {
            translate(this.state.text, langFrom, langTo)
                .then(result => {
                    this.updateTranslations(result);
                })
                .catch(console.log);
        }

        window.scrollTo(0, 0);
    }

    componentWillReceiveProps(nextProps) {
        const {
            id,
            text,
            stemmedText,
            sourceReference,
            translationFrom,
            translationFromType,
            translationTo,
            translationReference,
            definition,
            definitionReference,
        } = nextProps.phrase || {};

        if (this.state.text !== text && this.state.id !== id) {
            this.setState({
                id,
                text,
                stemmedText,
                sourceReference,
                translationFrom: translationFrom || text,
                translationFromType,
                translationTo: translationTo.split(',').map(word => word.trim()).filter(word => word),
                translationReference,
                definition,
                definitionReference,
            });
        }

    }

    handleSubmit() {
        const { onSubmit } = this.props;

        return (e) => {
            e.stopPropagation();
            e.preventDefault();
            const {
                text,
                stemmedText,
                sourceReference,
                translationFrom,
                translationFromType,
                translationTo,
                translationReference,
                definition,
                definitionReference,
            } = this.state;
            onSubmit && onSubmit({
                text: text || translationFrom,
                stemmedText,
                sourceReference,
                translationFrom,
                translationFromType,
                translationTo: translationTo.join(', '),
                translationReference,
                definition,
                definitionReference,
            });

            // this.text.focus();
            // this.text.value = '';
            // this.translationFrom.value = '';
            // this.translationTo.value = '';
            // this.reference.value = '';
            // this.definition.value = '';
            // this.definitionRefe.value = '';
        };
    }

    handleCancelClick(e) {
        const { onCancelClick } = this.props;
        e.stopPropagation();
        e.preventDefault();
        onCancelClick && onCancelClick();
    }

    handleInputChange(name, handleChange) {
        return () => {
            const currentState = this.state;
            currentState[name] = this[name].value;
            handleChange && handleChange(this[name].value);
            this.setState(currentState);
        };
    }

    updateTranslations(result) {
        if (!result.translations || !result.translations.length) {
            return [];
        }
        const translations = result.translations.reduce((acc, tran) => {
            return [].concat(acc, tran.translations);
        }, []);
        this.setState({
            translations,
        });
    }

    renderInput(type, label, name, value, id, handleChange) {
        const props = {
            type: 'text',
            name: name,
            ref: (input) => this[name] =  input,
            value: value,
            id: `phrase-form__text-input-${name}-${id}`,
            className: 'phrase-form__text-input',
            onChange: this.handleInputChange(name, handleChange),
            rows: 4,
        };
        const input = type === 'text' ? (<input {...props} />) : (<textarea {...props}></textarea>);
        return (
            <div>
                <label
                    htmlFor={`phrase-form__text-input-${name}-${id}`}
                    className="phrase-form__input-label"
                >
                    {label}
                </label>
                {input}
            </div>
        );
    }

    renderDeleteButton() {
        const { onDeleteClick, phrase } = this.props;
        if (!phrase.id) {
            return null;
        }

        return (
            <ButtonWithConfirmation
                label="delete"
                confirmationMessage="Do you want to delete this phrase?"
                onConfirm={() => onDeleteClick(phrase.id)}
                buttonClassName="phrase-item__delete"
            />
        );
    }

    render() {
        const {
            id,
            sourceReference,
            translationFrom,
            // translationTo,
            translationReference,
            definition,
            definitionReference,
            translations,
        } = this.state || {};

        return (
            <div className="phrase-form">
                <form onSubmit={this.handleSubmit()}>
                    {sourceReference ? (<div
                        className="phrase-item__reference"
                        dangerouslySetInnerHTML={{__html: `... ${sourceReference} ...`}}
                    />) : null}
                    {this.renderInput('text', 'Translation from', 'translationFrom', translationFrom, id, (value) => {
                        const { vocabulary } = this.props;

                        const langFrom = getSupportedLanguage(vocabulary.langFrom) || 'en';
                        const langTo = getSupportedLanguage(vocabulary.langTo) || 'el';

                        if ([langFrom, langTo].includes('en')) {
                            translate(value, langFrom, langTo)
                                .then(result => {
                                    this.updateTranslations(result);
                                })
                                .catch(console.log);
                        }
                    })}
                    <div className="phrase-form__form">
                        {/* {this.renderInput('text', 'Translation to', 'translationTo', translationTo, id)} */}
                        <div>
                            <label
                                className="phrase-form__input-label"
                            >
                                Translation to
                            </label>
                            <TagsInput
                                value={this.state.translationTo}
                                onChange={(translationTo) => {
                                    this.setState({
                                        translationTo,
                                    });
                                }}
                                inputProps={{
                                    className: 'react-tagsinput-input',
                                    placeholder: 'Add a translation'
                                }}
                                onlyUnique
                            />
                        </div>
                        {this.renderInput('text', 'Translation Reference', 'translationReference', translationReference, id)}
                        {this.renderInput('text', 'Definition', 'definition', definition, id)}
                        {this.renderInput('text', 'Definition Reference', 'definitionReference', definitionReference, id)}
                        <div className="phrase-form__buttons">
                            <button
                                className="phrase-form__cancel-button"
                                onClick={this.handleCancelClick}
                            >
                                Cancel
                            </button>
                            <input type="submit" className="phrase-form__submit-button" />
                        </div>
                        <div className="phrase-form__delete-button-wrapper">
                            {this.renderDeleteButton()}
                        </div>

                        {'Source: wordreference.com'}

                        <div className="phrase-form__translations">
                            {translations.map((translation, i) => {
                                return (
                                    <div
                                        key={i}
                                        className="phrase-form__translation"
                                    >
                                        <div
                                            className="phrase-form__translation-text"
                                        >
                                            {translation.from} ({translation.fromType}) - {translation.to}
                                        </div>
                                        <div
                                            className="phrase-form__translation-text"
                                        >
                                            {translation.definition}
                                        </div>
                                        <div className="phrase-form__translation-buttons">
                                            <button
                                                className="phrase-form__translation-button"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    this.setState({
                                                        translationFrom: translation.from,
                                                        translationFromType: translation.fromType,
                                                        translationTo: translation.to.split(',').map(word => word.trim()).filter(word => word),
                                                        translationReference: 'wordreference.com',
                                                    });
                                                }}
                                            >
                                                {this.state.translationTo.length > 0 ? 'Replace translation' : 'Add translation'}
                                            </button>
                                            {this.state.translationTo.length > 0 ? (
                                                <button
                                                    className="phrase-form__translation-button"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        this.setState({
                                                            translationFrom: translation.from,
                                                            translationFromType: translation.fromType,
                                                            translationTo: []
                                                              .concat(this.state.translationTo, translation.to.split(',').map(word => word.trim()).filter(word => word))
                                                              .filter((elem, pos, arr) => arr.indexOf(elem) === pos),
                                                            translationReference: 'wordreference.com',
                                                        });
                                                    }}
                                                >
                                                    {'Add translation'}
                                                </button>
                                            ) : null}
                                            <button
                                                className="phrase-form__translation-button"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    this.setState({
                                                        definition: translation.definition,
                                                        definitionReference: 'wordreference.com',
                                                    });
                                                }}
                                            >
                                              Add definition
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default PhraseForm;
