import React, { Component } from 'react';
import './style.css';

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
            <div className="VocabularyForm">
                <form onSubmit={this.handleSubmit()}>
                    <input type="text" name="newVocabulary" ref={(newVocabulary) => this.newVocabulary = newVocabulary} defaultValue="" />
                    <input type="submit" />
                </form>
            </div>
        );
    }
}

export default VocabularyForm;
