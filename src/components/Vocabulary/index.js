import React, { Component } from 'react';
import './style.css';
import pdfjsLib from 'pdfjs-dist';
import WebFileSystem from '../WebFileSystem';

class Vocabulary extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pdfPath: null,
        };

        this.handleWebFileSystemChange = this.handleWebFileSystemChange.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderPhraseListItem = this.renderPhraseListItem.bind(this);
    }

    componentWillMount() {
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

    handleEditClick(phraseId) {
        return (e) => {
            e.stopPropagation();
            e.preventDefault();
        }
    }

    handleDeleteClick(phraseId) {
        const { vocabulary, onDeleteClick } = this.props;

        return (e) => {
            e.stopPropagation();
            e.preventDefault();
            onDeleteClick && onDeleteClick({
                phraseId,
                vocabularyId: vocabulary.id,
            });
        }
    }

    renderPhraseListItem(phrase) {
        return (
            <div
                className="phrase-item"
                key={phrase.id}
            >
                <div className="phrase-item__text">{phrase.text}</div>
                <div className="phrase-item__translation">{phrase.translation}</div>
                <div className="phrase-item__definition">{`(${phrase.definition})`}</div>
                <div
                    className="phrase-item__reference"
                    dangerouslySetInnerHTML={{__html: `... ${phrase.reference} ...`}} />
                <a
                    href="#"
                    className="phrase-item__edit"
                    onClick={this.handleEditClick(phrase.id)}
                >
                    edit
                </a>
                <a
                    href="#"
                    className="phrase-item__delete"
                    onClick={this.handleDeleteClick(phrase.id)}
                >
                    delete
                </a>
            </div>
        );
    }

    renderPDF() {
        const { pdfPath } = this.state;
        if (!pdfPath) {
            return;
        }

        document.addEventListener("selectionchange", function() {
            if (window.getSelection() && window.getSelection().type === 'Range') {
                const range = window.getSelection().getRangeAt(0);
                console.log('Selection changed.',
                    range.endContainer.data,
                    range.endContainer.data.slice(range.startOffset, range.endOffset)
                );
                console.log(window.getSelection().baseNode.parentElement.textContent);
            }
        });
        // http://mozilla.github.io/pdf.js/examples/index.html#interactive-examples
        // window.getSelection().getRangeAt(0);
        // 'mind. Her father was a fisherman, and it was'.slice(17, 20)
        var SVG_NS = 'http://www.w3.org/2000/svg';
        function buildSVG(viewport, textContent) {
            // Building SVG with size of the viewport (for simplicity)
            var svg = document.createElementNS(SVG_NS, 'svg:svg');
            svg.setAttribute('width', viewport.width + 'px');
            svg.setAttribute('height', viewport.height + 'px');
            // items are transformed to have 1px font size
            svg.setAttribute('font-size', 0.9);

            // processing all items
            textContent.items.forEach(function (textItem) {
                // we have to take in account viewport transform, which includes scale,
                // rotation and Y-axis flip, and not forgetting to flip text.
                var tx = pdfjsLib.PDFJS.Util.transform(
                    pdfjsLib.PDFJS.Util.transform(viewport.transform, textItem.transform),
                    [1, 0, 0, -1, 0, 0]);
                var style = textContent.styles[textItem.fontName];
                // adding text element
                var text = document.createElementNS(SVG_NS, 'svg:text');
                text.setAttribute('transform', 'matrix(' + tx.join(' ') + ')');
                text.setAttribute('font-family', style.fontFamily);
                text.textContent = textItem.str;
                svg.appendChild(text);
            });
            return svg;
        }
        function buildText(textContent) {
            let content = '';

            // processing all items
            textContent.items.forEach(function (textItem) {
                content = content + ' ' + textItem.str + '<br/>';
            });
            return content;
        }
        // const pdfPath = URL.createObjectURL('../../../../../../Downloads/American_Gods.pdf');
        pdfjsLib.PDFJS.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.0.228/build/pdf.worker.js';
        const loadingTask = pdfjsLib.getDocument(pdfPath);
        loadingTask.promise.then(function (pdfDocument) {
            // Request a first page
            return pdfDocument.getPage(168).then(function (pdfPage) {
                // Display page on the existing canvas with 100% scale.
                // var canvas = document.getElementById('pdf-canvas');
                // const scale = 2.0;
                // var viewport = pdfPage.getViewport(scale);
                // canvas.width = viewport.width;
                // canvas.height = viewport.height;
                // var ctx = canvas.getContext('2d');
                // var renderTask = pdfPage.render({
                //     canvasContext: ctx,
                //     viewport: viewport
                // });
                // return renderTask.promise;
                const scale = 2.0;
                var viewport = pdfPage.getViewport(scale);
                pdfPage.getTextContent().then(function (textContent) {
                    // building SVG and adding that to the DOM
                    // var svg = buildSVG(viewport, textContent);
                    // document.getElementById('pdf-canvas').appendChild(svg);
                    const text = buildText(textContent);
                    document.getElementById('pdf-canvas').innerHTML = text;
                });
            });
        }).catch(function (reason) {
            console.error('Error: ' + reason);
        });
        return (
            <div id="pdf-canvas"></div>
        );
    }

    render() {
        const { vocabulary } = this.props;
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
                {vocabulary.phrases.map(this.renderPhraseListItem)}
            </div>
        );
    }
}

export default Vocabulary;
