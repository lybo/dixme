import React, { Component } from 'react';
import './style.css';
import pdfjsLib from 'pdfjs-dist';

class PDFReader extends Component {
    constructor(props) {
        super(props);

        this.renderPDFcontent = this.renderPDFcontent.bind(this);
        this.handleAnnotationClick = this.handleAnnotationClick.bind(this);
        this.handleInputPageNumber = this.handleInputPageNumber.bind(this);
        this.handleSelectionChange = this.handleSelectionChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.vocabulary.phrases.length !== this.props.vocabulary.phrases.length) {
            this.renderPage(this.pageNumber);
        }
    }

    componentWillMount() {
        document.addEventListener('selectionchange', this.handleSelectionChange);
    }

    componentDidMount() {
        const { pdfPath } = this.props;
        this.parsePDF(pdfPath, this.renderPDFcontent);
    }

    componentWillUnmount() {
        document.removeEventListener('selectionchange', this.handleSelectionChange);
    }

    getParsedPDFWithPhrases(text, phrases) {
        const enhancedPhrases = phrases
            .map(phrases => {
                const result = phrases.reference.match(/<b>(.*?)<\/b>/g);
                if (!result || !result[0]) {
                    return phrases;
                }
                const word = result[0].replace('<b>', '').replace('</b>', '');
                return Object.assign({}, phrases, {
                    highlighedWord: word,
                });
            });
        enhancedPhrases.forEach(enhancedPhrase => {
            text = text.replace(enhancedPhrase.highlighedWord, `<span class="pdf-annotation" id="${enhancedPhrase.id}">${enhancedPhrase.highlighedWord}</span>`)
        });

        return text;
    }

    handleAnnotationClick(evt) {
        const { vocabulary } = this.props;
        console.log(vocabulary.phrases.find(phrase => phrase.id === evt.currentTarget.id));
    }

    renderPDFcontent(text) {
        const { vocabulary } = this.props;
        const content = this.getParsedPDFWithPhrases(text, vocabulary.phrases);

        this.cashedText = content;
        this.pdfReader.innerHTML = content;

        const pdfAnnotations = document.querySelectorAll('.pdf-annotation');
        [].forEach.call(pdfAnnotations, (pdfAnnotation) => {
            pdfAnnotation.removeEventListener('click', this.handleAnnotationClick);
            pdfAnnotation.addEventListener('click', this.handleAnnotationClick);
        });
    }

    handleSelectionChange() {
        const { onSelection } = this.props;
        if (window.getSelection() && window.getSelection().baseNode.parentElement.id === 'pdfReader' && window.getSelection().type === 'Range') {
            const range = window.getSelection().getRangeAt(0);
            // console.log('Selection changed.',
            //     range.endContainer.data,
            //     range.endContainer.data.slice(range.startOffset, range.endOffset)
            // );
            // console.log(window.getSelection().baseNode.parentElement.textContent);
            onSelection && onSelection(
                range.endContainer.data.slice(range.startOffset, range.endOffset),
                window.getSelection().baseNode.parentElement.textContent,
            );
        }
    }

    parsePDF(pdfPath, onLoad) {
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
        // const pdfPath = URL.createObjectURL('../../../../../../Downloads/American_Gods.pdf');
        pdfjsLib.PDFJS.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.0.228/build/pdf.worker.js';
        const loadingTask = pdfjsLib.getDocument(pdfPath);
        loadingTask.promise.then((pdfDocument) => {
            this.pdfDocument = pdfDocument;
            this.pageNumber = 1;
            return this.renderPage(this.pageNumber);
        }).catch(function (reason) {
            console.error('Error: ' + reason);
        });

    }

    renderPage(pageNumber) {
        function buildText(textContent) {
            let content = '';

            // processing all items
            textContent.items.forEach(function (textItem) {
                content = content + ' ' + textItem.str + '<br/>';
            });
            return content;
        }
        this.pdfDocument.getPage(pageNumber).then((pdfPage) => {
            const scale = 2.0;
            const viewport = pdfPage.getViewport(scale);
            pdfPage.getTextContent().then((textContent) => {
                // building SVG and adding that to the DOM
                // var svg = buildSVG(viewport, textContent);
                // document.getElementById('pdf-canvas').appendChild(svg);
                const text = buildText(textContent);
                this.renderPDFcontent(text);
            });
        });
    }


    handleInputPageNumber() {
        const pageNumber = parseInt(this.inputPageNumber.value);
        if (isNaN(pageNumber) || pageNumber <= 0) {
            return;
        }
        this.pageNumber = pageNumber;
        this.renderPage(pageNumber);
    }

    render() {
        return (
            <div>
                <input
                    type="number"
                    ref={(inputPageNumber) => this.inputPageNumber = inputPageNumber}
                    defaultValue="1"
                    onChange={this.handleInputPageNumber}
                />
                <div id="pdfReader" ref={(pdfReader) => this.pdfReader = pdfReader}></div>
            </div>
        );
    }

}

export default PDFReader;
