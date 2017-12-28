import React, { Component } from 'react';
import './style.css';
import pdfjsLib from 'pdfjs-dist';
import WebFileSystem from '../WebFileSystem';
import PDFReader from '../PDFReader';
import PhraseListItem from '../PhraseListItem';

class Vocabulary extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pdfPath: null,
        };

        this.handleWebFileSystemChange = this.handleWebFileSystemChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleWebFileSystemChange(file) {
        this.setState({
            pdfPath: URL.createObjectURL(file),
        });
    }

    handleSubmit() {
        const { vocabulary, onAddPhrase } = this.props;

        return (e) => {
            e.stopPropagation();
            e.preventDefault();
            const currentDate = new Date();
            onAddPhrase && onAddPhrase({
                phrase: {
                    id: currentDate.toString(),
                    text: this.newPhrase.value,
                    translation: this.translation.value,
                    reference: this.reference.value,
                    definition: this.definition.value,
                },
                vocabularyId: vocabulary.id,
            });

            this.newPhrase.focus();
            this.newPhrase.value = '';
            this.translation.value = '';
            this.reference.value = '';
            this.definition.value = '';
        };
    }


    renderPDF() {
        const { pdfPath } = this.state;
        if (!pdfPath) {
            return;
        }

        const { vocabulary } = this.props;
        return (
            <PDFReader pdfPath={pdfPath} vocabulary={vocabulary} />
        );
    }

    render() {
        const { vocabulary, onDeleteClick } = this.props;
        return (
            <div className="vocabulary-form">
                <WebFileSystem onChange={this.handleWebFileSystemChange} />
                {this.renderPDF()}
                <form onSubmit={this.handleSubmit()}>
                    <label>Phrase</label>
                    <input type="text" name="newPhrase" ref={(newPhrase) => this.newPhrase = newPhrase} defaultValue="" className="vocabulary-form__text-input" />
                    <br />
                    <label>Translation</label>
                    <input type="text" name="translation" ref={(translation) => this.translation = translation} defaultValue="" className="vocabulary-form__text-input" />
                    <br />
                    <label>Reference</label>
                    <input type="text" name="reference" ref={(reference) => this.reference = reference} defaultValue="" className="vocabulary-form__text-input" />
                    <br />
                    <label>Defintion</label>
                    <input type="text" name="definition" ref={(definition) => this.definition = definition} defaultValue="" className="vocabulary-form__text-input" />
                    <input type="submit" className="vocabulary-form__submit-button" />
                </form>
                {vocabulary.phrases.map((phrase) => {
                    return (
                        <PhraseListItem
                            key={phrase.id}
                            vocabulary={vocabulary}
                            onDeleteClick={onDeleteClick}
                            phrase={phrase}
                        />
                    );
                })}
            </div>
        );
    }
}

export default Vocabulary;
