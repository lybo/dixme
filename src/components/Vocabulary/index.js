import React, { Component } from 'react';
import './style.css';
import pdfjsLib from 'pdfjs-dist';
import WebFileSystem from '../WebFileSystem';
import PDFReader from '../PDFReader';
import PhraseListItem from '../PhraseListItem';
import PhraseForm from '../PhraseForm';
import { getPhraseModel } from '../../reducers/phrase';

class Vocabulary extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pdfPath: null,
            selectedPhrase: getPhraseModel(),
        };

        this.handleWebFileSystemChange = this.handleWebFileSystemChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelection = this.handleSelection.bind(this);
    }

    handleWebFileSystemChange(file) {
        this.setState({
            pdfPath: URL.createObjectURL(file),
        });
    }

    handleSubmit(phrase) {
        const { vocabulary, onAddPhrase } = this.props;

        this.setState({
            selectedPhrase: getPhraseModel(),
        });
        const currentDate = new Date().getTime();
        onAddPhrase && onAddPhrase({
            phrase: {
                ...phrase,
                id: currentDate.toString(),
            },
            vocabularyId: vocabulary.id,
        });

    }

    handleSelection(text, pageTextContent) {
        const regexp = new RegExp(`[^.]*${text}[^.]*\.`, 'g');
        const result = pageTextContent.match(regexp, text);
        if (result && result[0]) {
            const currentDate = new Date().getTime();
            const reference = result[0].replace(text, `<b>${text}</b>`)
            this.setState({
                selectedPhrase: getPhraseModel({
                    id: currentDate.toString(),
                    text,
                    reference,
                })
            });
        }
    }

    renderPDF() {
        const { pdfPath } = this.state;
        if (!pdfPath) {
            return;
        }

        const { vocabulary } = this.props;
        return (
            <PDFReader
                pdfPath={pdfPath}
                vocabulary={vocabulary}
                onSelection={this.handleSelection}
            />
        );
    }

    renderTranslationLinks() {
        const { selectedPhrase } = this.state;
        const text = encodeURIComponent(selectedPhrase.text || '');
        return (
            <div>
                <a href={`http://www.wordreference.com/engr/${text}`} target="_blank">wordreference</a>
                <br />
                <a href={`https://translate.google.gr/#en/el/${text}`} target="_blank">google</a>
                <br />
                <a href={`http://www.bing.com/translator/?from=en&to=el&text=${text}`} target="_blank">bing</a>
            </div>
        );
    }

    render() {
        const { selectedPhrase } = this.state;
        const { vocabulary, onDeleteClick } = this.props;
        return (
            <div className="vocabulary-form">
                <WebFileSystem
                    onChange={this.handleWebFileSystemChange}
                />
                {this.renderPDF()}
                <PhraseForm
                    phrase={selectedPhrase}
                    onSubmit={this.handleSubmit}
                />
                {this.renderTranslationLinks()}
                {vocabulary.phrases.filter(phrase => phrase).map((phrase) => {
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
