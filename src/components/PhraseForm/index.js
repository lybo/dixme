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

    handleInputChange(name) {
        return () => {
            const currentState = this.state;
            currentState[name] = this[name].value;
            this.setState(currentState);
        };
    }

    renderInput(label, name, value, id) {
        const props = {
            type: 'text',
            name: name,
            ref: (input) => this[name] =  input,
            value: value,
            id: `phrase-form__text-input-${id}`,
            className: 'phrase-form__text-input',
            onChange: this.handleInputChange(name)
        };
        return (
            <div>
                <label>{label}</label>
                <input {...props} />
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
                    {this.renderInput('Phrase', 'text', text, id)}
                    {this.renderInput('Translation', 'translation', translation, id)}
                    {this.renderInput('Reference', 'reference', reference, id)}
                    {this.renderInput('Definition', 'definition', definition, id)}
                    <input type="submit" className="phrase-form__submit-button" />
                </form>
            </div>
        );
    }
}

export default PhraseForm;
