import React, { Component } from 'react';
import './style.css';

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
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancelClick = this.handleCancelClick.bind(this);
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

    handleInputChange(name) {
        return () => {
            const currentState = this.state;
            currentState[name] = this[name].value;
            this.setState(currentState);
        };
    }

    renderInput(type, label, name, value, id) {
        const props = {
            type: 'text',
            name: name,
            ref: (input) => this[name] =  input,
            value: value,
            id: `phrase-form__text-input-${name}-${id}`,
            className: 'phrase-form__text-input',
            onChange: this.handleInputChange(name),
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

    render() {
        const {
            id,
            text,
            translation,
            reference,
            definition,
        } = this.state || {};

        return (
            <div className="phrase-form">
                <form onSubmit={this.handleSubmit()}>
                    {this.renderInput('text', 'Phrase', 'text', text, id)}
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
                </form>
            </div>
        );
    }
}

export default PhraseForm;
