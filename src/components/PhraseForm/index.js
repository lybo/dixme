import React, { Component } from 'react';
import './style.css';
import ButtonWithConfirmation from '../ButtonWithConfirmation';
import wordreferenceAPI from 'wordreference-api';

class PhraseForm extends Component {
    constructor(props) {
        super(props);

        const {
            id,
            text,
            translation,
            reference,
            definition,
        } = this.props.phrase || {};

        this.state = {
            id,
            text,
            translation,
            reference,
            definition,
            translations: [],
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancelClick = this.handleCancelClick.bind(this);
    }

    componentWillMount() {
        wordreferenceAPI(this.state.text,'en','gr')
            .then(result => {
                this.updateTranslations(result);
            })
            .catch(console.log);
    }

    componentWillReceiveProps(nextProps) {
        const {
            id,
            text,
            translation,
            reference,
            definition,
        } = nextProps.phrase || {};

        if (this.state.text !== text && this.state.id !== id) {
            this.setState({
                id,
                text,
                translation,
                reference,
                definition,
            });
        }

    }

    handleSubmit() {
        const { vocabulary, onSubmit } = this.props;

        return (e) => {
            e.stopPropagation();
            e.preventDefault();
            onSubmit && onSubmit({
                text: this.text.value,
                translation: this.translation.value,
                reference: this.reference.value,
                definition: this.definition.value,
            });

            this.text.focus();
            this.text.value = '';
            this.translation.value = '';
            this.reference.value = '';
            this.definition.value = '';
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
            text,
            translation,
            reference,
            definition,
            translations,
        } = this.state || {};

        return (
            <div className="phrase-form">
                <form onSubmit={this.handleSubmit()}>
                    {this.renderInput('text', 'Phrase', 'text', text, id, (value) => {
                        wordreferenceAPI(value,'en','gr')
                            .then(result => {
                                this.updateTranslations(result);
                            })
                            .catch(console.log);
                    })}
                    {this.renderInput('text', 'Translation', 'translation', translation, id)}
                    {this.renderInput('text', 'Definition', 'definition', definition, id)}
                    {this.renderInput('textarea', 'Reference', 'reference', reference, id)}
                    <div className="phrase-form__buttons">
                        <button
                            className="phrase-form__cancel-button"
                            onClick={this.handleCancelClick}
                        >
                            Cancel
                        </button>
                        <input type="submit" className="phrase-form__submit-button" />
                    </div>
                    {this.renderDeleteButton()}
                </form>
                <div className="phrase-form__translations">
                    {translations.map((translation, i) => {
                        return (
                            <button
                                key={i}
                                className="phrase-form__translation"
                                onClick={() => {
                                    this.setState({
                                        translation: translation.to
                                    });
                                }}
                            >
                                {translation.from} ({translation.fromType})
                                {translation.to}
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default PhraseForm;
