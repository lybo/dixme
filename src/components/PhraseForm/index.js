import React, { Component } from 'react';
import 'react-tagsinput/react-tagsinput.css'
import './style.css';
import ButtonWithConfirmation from '../ButtonWithConfirmation';
import { translate } from '../../services/translation/';
import DebounceTextInput from '../Form/DebounceTextInput';
import TextInput from '../Form/TextInput';
import TextareaInput from '../Form/TextareaInput';
import TagsInput from '../Form/TagsInput';
import Fieldset from '../Fieldset';

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
const SCROLL_POSITION_LIMIT = 30;

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
            isLoading: false,
            showNotification: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancelClick = this.handleCancelClick.bind(this);
    }

    componentWillMount() {
        this.translate(this.state.text);
        window.scrollTo(0, 0);
        window.addEventListener('scroll', this.handleScroll);
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

    componentWillUnmount() {
        if (this.time) {
            clearTimeout(this.time);
        }

        window.removeEventListener('scroll', this.handleScroll);
    }

    translate(text) {
        const {
            langFrom,
            langTo,
        } = this.getTranslationLangKeys();

        if (this.hasTranslationAPI()) {
            this.setState({
                isLoading: true,
            });

            translate(text, langFrom, langTo)
                .then(result => {
                    this.updateTranslations(result);
                })
                .catch(console.log)
                .then(result => {
                    this.setState({
                        isLoading: false,
                    });
                });
        }
    }

    getTranslationLangKeys() {
        const { vocabulary } = this.props;

        const langFrom = getSupportedLanguage(vocabulary.langFrom) || 'en';
        const langTo = getSupportedLanguage(vocabulary.langTo) || 'el';
        return {
            langFrom,
            langTo,
        };
    }

    hasTranslationAPI() {
        const {
            langFrom,
            langTo,
        } = this.getTranslationLangKeys();
        return [langFrom, langTo].includes('en');
    }

    handleScroll = (e) => {
        if (window.scrollY > SCROLL_POSITION_LIMIT) {
            return;
        }

        if (this.time) {
            clearTimeout(this.time);
        }

        this.setState({
            showNotification: false,
        });
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
                translationTo: Array.isArray(translationTo) ? translationTo.join(', ') : translationTo,
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

    startNotification() {
        if (window.scrollY <= SCROLL_POSITION_LIMIT) {
            return;
        }

        if (this.time) {
            clearTimeout(this.time);
        }

        this.setState({
            showNotification: true,
        });

        this.time = setTimeout(() => {
            this.setState({
                showNotification: false,
            });
            if (this.time) {
                clearTimeout(this.time);
                this.time = null;
            }
        }, 5000);
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
            name,
            value,
            label: name,
            inputRef: (input) => this[name] = input,
            id: `phrase-form__text-input-${name}-${id}`,
            // className: 'phrase-form__text-input',
            onChange: this.handleInputChange(name, handleChange),
            rows: 4,
        };

        return type === 'text' ? (
            <TextInput {...props} />
        ) : (
            <TextareaInput {...props} />
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

    renderNotificationRow(label, value) {
        return (
            <div className="phrase-form__notification-row">
                <div className="phrase-form__notification-label">{label}:</div>
                <div className="phrase-form__notification-value">{value}</div>
            </div>
        );
    }

    render() {
        const {
            id,
            sourceReference,
            translationFrom,
            translationTo,
            translationReference,
            definition,
            definitionReference,
            translations,
            isLoading,
            showNotification,
        } = this.state || {};

        const hasTranslationAPI = this.hasTranslationAPI();

        return (
            <div className="phrase-form">
                {showNotification && (
                    <div className="phrase-form__notification">
                        {this.renderNotificationRow('Translation from', translationFrom)}
                        {this.renderNotificationRow('Translation to', translationTo.join(', '))}
                        {this.renderNotificationRow('Definition', definition)}
                        <button
                            className="phrase-form__notification-button"
                            onClick={() => {
                                window.scrollTo(0, 0);
                            }}
                        >
                            go to form
                        </button>
                    </div>
                )}
                <form onSubmit={this.handleSubmit()}>
                    {sourceReference ? (<div
                        className="phrase-item__reference"
                        dangerouslySetInnerHTML={{__html: `... ${sourceReference} ...`}}
                    />) : null}
                    <Fieldset
                        title="Edit Phrase"
                    >
                        <div className="phrase-form__form">
                            <DebounceTextInput
                                id="translationFrom"
                                label="Translation from"
                                debounceTimeout={1000}
                                inputRef={input => {
                                    this.translationFrom = input;
                                }}
                                value={translationFrom}
                                onChange={event => {
                                    this.setState({
                                        ...this.state,
                                        translationFrom: event.target.value,
                                    });
                                    this.translate(event.target.value);
                                }}
                            />
                            <TagsInput
                                id="translationTo"
                                name="translationTo"
                                label="Translation to"
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
                        </div>
                        <div className="phrase-form__delete-button-wrapper">
                            {this.renderDeleteButton()}
                        </div>
                    </Fieldset>


                    {hasTranslationAPI && (
                        <Fieldset
                            title="Translations"
                        >
                            {'Source: wordreference.com'}
                            <div className="phrase-form__translations">
                                {isLoading ? (
                                    <span>Loading</span>
                                ) : translations.map((translation, i) => {
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
                                                        this.startNotification();
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
                                                            this.startNotification();
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
                                                        this.startNotification();
                                                    }}
                                                >
                                                    Add definition
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </Fieldset>
                    )}

                </form>
            </div>
        );
    }
}

export default PhraseForm;
