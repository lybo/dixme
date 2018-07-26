import React, { Component } from 'react';
import './style.css';
import pdfjsLib from 'pdfjs-dist';
import Load from '../Load/';
import TextToSpeechButton from '../TextToSpeechButton';
import FixedFooter from '../FixedFooter';

const DEFAULT_PAGE_NUMBER = 1;
const PDF_READER_ANNOTATION_CLASS_NAME = 'pdf-reader__annotation';

class PDFReader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pageNumber: props.vocabulary.lastPageNumber ||  DEFAULT_PAGE_NUMBER,
            pdfPagesNumber: 0,
            selectedPhrase: null,
            isSelectionDialogVisible: false,
            isLoading: false,
        };

        this.isVisible = props.isVisible;

        this.renderPDFcontent = this.renderPDFcontent.bind(this);
        this.handleAnnotationClick = this.handleAnnotationClick.bind(this);
        this.handleNavButtonClick = this.handleNavButtonClick.bind(this);
        this.handleInputPageNumber = this.handleInputPageNumber.bind(this);
        this.handleSelectionChange = this.handleSelectionChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (!this.pdfDocument) {
            return;
        }

        const hasPhrasesChanged = nextProps.vocabulary.phrases.length !== this.props.vocabulary.phrases.length;
        const hasPdfPathChanged = nextProps.pdfPath !== this.props.pdfPath;
        if (hasPhrasesChanged) {
            // this.renderPage(this.state.pageNumber);
            this.renderPDFcontent(this.cashedRawText, nextProps.vocabulary.phrases, false);
        }
        if (hasPdfPathChanged) {
            this.setState({
                pageNumber: nextProps.vocabulary.lastPageNumber ||  DEFAULT_PAGE_NUMBER,
            });
            this.parsePDF(nextProps.pdfPath, this.renderPDFcontent);
        }

        if (nextProps.isVisible && nextProps.isVisible !== this.isVisible) {
            setTimeout(() => {
                document.documentElement.scrollTop = nextProps.vocabulary.pdfLastScrollPosition;
            }, 1);
        }

        this.isVisible = nextProps.isVisible;

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
        let newText = text;
        //https://github.com/padolsey/findAndReplaceDOMText
        phrases
            .map(phrase => phrase.text)
            .filter((v, i, a) => a.indexOf(v) === i)
            .forEach(enhancedPhrase => {
                newText = newText.replace(
                    new RegExp(`(\\b${enhancedPhrase}\\b)(?![^<]*>|[^<>]*</)`, 'gm'),
                    `<span class="${PDF_READER_ANNOTATION_CLASS_NAME}" id="${enhancedPhrase}">${enhancedPhrase}</span>`,
                );
            });

        return newText;
    }

    handleAnnotationClick(evt) {
        this.setState({
            selectedPhrase: evt.currentTarget.id,
            isSelectionDialogVisible: false,
        });
    }

    renderPDFcontent(text, phrases, scroll) {
        // const { vocabulary } = this.props;
        const content = this.getParsedPDFWithPhrases(text, phrases);

        this.cashedText = content;
        this.cashedRawText = text;
        this.pdfReader.innerHTML = content;


        if (scroll) {
            setTimeout(() => {
                document.documentElement.scrollTop = this.props.vocabulary.pdfLastScrollPosition;
                this.setState({
                    isLoading: false,
                });
            }, 10);
        } else {
            this.setState({
                isLoading: false,
            });
        }

        const pdfAnnotations = document.querySelectorAll(`.${PDF_READER_ANNOTATION_CLASS_NAME}`);
        [].forEach.call(pdfAnnotations, (pdfAnnotation) => {
            pdfAnnotation.removeEventListener('click', this.handleAnnotationClick);
            pdfAnnotation.addEventListener('click', this.handleAnnotationClick);
        });
    }

    getSelectionNode() {
        const node = window.getSelection().baseNode || window.getSelection().focusNode;

        if (!node) {
            return null;
        }

        if (node.id === 'pdfReader') {
            return node;
        }

        if (node.parentElement.id === 'pdfReader') {
            return node.parentElement;
        }

        return null;
    }

    handleSelectionChange() {
        const isSelectionDialogVisible = window.getSelection() &&
            this.getSelectionNode() &&
            window.getSelection().type === 'Range' &&
            // window.getSelection().getRangeAt &&
            // window.getSelection().getRangeAt(0) &&
            window.getSelection().toString().trim();
        this.setState({
            isSelectionDialogVisible,
            selectedPhrase: null,
        });
    }

    parsePDF(pdfPath, onLoad) {
        // http://mozilla.github.io/pdf.js/examples/index.html#interactive-examples
        // window.getSelection().getRangeAt(0);
        // 'mind. Her father was a fisherman, and it was'.slice(17, 20)
        // var SVG_NS = 'http://www.w3.org/2000/svg';
        // function buildSVG(viewport, textContent) {
        //     // Building SVG with size of the viewport (for simplicity)
        //     var svg = document.createElementNS(SVG_NS, 'svg:svg');
        //     svg.setAttribute('width', viewport.width + 'px');
        //     svg.setAttribute('height', viewport.height + 'px');
        //     // items are transformed to have 1px font size
        //     svg.setAttribute('font-size', 0.9);
        //
        //     // processing all items
        //     textContent.items.forEach(function (textItem) {
        //         // we have to take in account viewport transform, which includes scale,
        //         // rotation and Y-axis flip, and not forgetting to flip text.
        //         var tx = pdfjsLib.PDFJS.Util.transform(
        //             pdfjsLib.PDFJS.Util.transform(viewport.transform, textItem.transform),
        //             [1, 0, 0, -1, 0, 0]);
        //         var style = textContent.styles[textItem.fontName];
        //         // adding text element
        //         var text = document.createElementNS(SVG_NS, 'svg:text');
        //         text.setAttribute('transform', 'matrix(' + tx.join(' ') + ')');
        //         text.setAttribute('font-family', style.fontFamily);
        //         text.textContent = textItem.str;
        //         svg.appendChild(text);
        //     });
        //     return svg;
        // }
        // pdfjsLib.PDFJS.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.0.228/build/pdf.worker.js';
        this.setState({
            isLoading: true,
        });
        pdfjsLib.PDFJS.workerSrc = '/pdf.worker.min.js';
        const loadingTask = pdfjsLib.getDocument(pdfPath);
        loadingTask.promise.then((pdfDocument) => {
            this.pdfDocument = pdfDocument;
            const pageNumber = this.state.pageNumber > pdfDocument.numPages ? DEFAULT_PAGE_NUMBER : this.state.pageNumber;
            this.setState({
                pdfPagesNumber: pdfDocument.numPages,
                pageNumber,
            });
            return this.renderPage(pageNumber, true);
        }).catch(function (reason) {
            console.error('Error: ' + reason);
            this.setState({
                isLoading: false,
            });
        });

    }

    renderPage(pageNumber, scroll) {
        if (!this.isPageNumberValid(pageNumber)) {
            return;
        }

        const { vocabulary } = this.props;
        function buildText(textContent) {
            let content = '';

            // processing all items
            textContent.items.forEach(function (textItem) {
                const space = ' ';
                const text = `${content} ${textItem.str}`
                    .trim()
                    .replace(/\t{4}/g, space)
                    .replace(/\t{4}/g, space)
                    .replace(/\t{3}/g, space)
                    .replace(/\t{3}/g, space)
                    .replace(/\t{2}/g, space)
                    .replace(/\t{2}/g, space)
                    .replace(/\t/g, space)
                    .replace(/\t/g, space)
                    .replace(/\s{4}/g, space)
                    .replace(/\s{4}/g, space)
                    .replace(/\s{3}/g, space)
                    .replace(/\s{3}/g, space)
                    .replace(/\s{2}/g, space)
                    .replace(/\s{2}/g, space);
                content = text;
            });
            return content;
        }
        this.setState({
            isLoading: true,
        });
        this.pdfDocument.getPage(pageNumber).then((pdfPage) => {
            // const scale = 1.0;
            // const viewport = pdfPage.getViewport(scale);
            pdfPage.getTextContent().then((textContent) => {
                // building SVG and adding that to the DOM
                // var svg = buildSVG(viewport, textContent);
                // document.getElementById('pdf-canvas').appendChild(svg);
                const text = buildText(textContent);
                this.renderPDFcontent(text, vocabulary.phrases, scroll);
            });
        });
    }

    isPageNumberValid(pageNumber) {
        return pageNumber && !isNaN(pageNumber) && pageNumber > 0;
    }

    handleInputPageNumber() {
        const { onPageNumberChange } = this.props;
        const pageNumber = parseInt(this.inputPageNumber.value, 10);
        this.setState({
            pageNumber
        });
        if (!this.isPageNumberValid(pageNumber)) {
            return;
        }
        this.renderPage(pageNumber);
        onPageNumberChange && onPageNumberChange(pageNumber);
    }

    handleNavButtonClick(nextPageNumber) {
        const { onPageNumberChange } = this.props;

        return (e) => {
            const { pageNumber } = this.state;
            const newPageNumber = parseInt(pageNumber + nextPageNumber, 10);
            if (!this.isPageNumberValid(newPageNumber) || newPageNumber > this.state.pdfPagesNumber) {
                return;
            }
            document.documentElement.scrollTop = 0;
            this.renderPage(newPageNumber);
            this.setState({
                pageNumber: newPageNumber
            });
            onPageNumberChange && onPageNumberChange(newPageNumber);
        };
    }

    renderNavButton(label, nextPageNumber) {
        return (
            <button
                className="pdf-reader__nav-button"
                onClick={this.handleNavButtonClick(nextPageNumber)}
            >
                {label}
            </button>
        );
    }

    renderAnnotationDialog() {
        const { isSelectionDialogVisible } = this.state;
        const { onSelection, onPdfScrollPositionChange } = this.props;

        if (!isSelectionDialogVisible) {
            return null;
        }

        const phrase = window.getSelection().toString().trim().replace(/\n/g, ' ');
        // console.log(window.getSelection().getRangeAt());

        if (!phrase) {
            return null;
        }

        return (
            <div
                className="pdf-reader__annotation_info"
            >
                {phrase}
                <div className="pdf-reader__annotation_info-buttons">
                    <button
                        className="pdf-reader__annotation_info-cancel-button"
                        onClick={() => {
                            this.setState({
                                isSelectionDialogVisible: false,
                            });
                        }}
                    >
                        Cancel
                    </button>

                    <button
                        className="pdf-reader__annotation_info-edit-button"
                        onClick={() => {
                            onPdfScrollPositionChange(document.documentElement.scrollTop);
                            this.setState({
                                isSelectionDialogVisible: false,
                            });
                            onSelection && onSelection({
                                textPage: this.getSelectionNode().textContent,
                                selection: window.getSelection(),
                            });
                        }}
                    >
                        Edit
                    </button>
                </div>
            </div>
        );

    }

    renderAnnotationConfirmation(selectedPhrases) {
        const { onPdfScrollPositionChange, vocabulary } = this.props;

        if (!selectedPhrases || !selectedPhrases.length) {
            return null;
        }

        return (
            <div
                className="pdf-reader__annotation_info"
            >
                <div className="pdf-reader__annotation_info-translations">
                    {selectedPhrases.map((selectedPhrase) => {

                        const translation = selectedPhrase.translationTo ? (
                            <div>
                                {selectedPhrase.translationFrom} ({selectedPhrase.translationFromType}): {selectedPhrase.translationTo}
                                {selectedPhrase.definition ? (
                                  <div className="pdf-reader__definition">{`(${selectedPhrase.definition})`}</div>
                                ) : (
                                  <div className="pdf-reader__definition">missing definition</div>
                                )}
                            </div>
                        ) : 'Missing translation';

                        return (
                            <div
                                className="pdf-reader__annotation_info-translation-container"
                                key={selectedPhrase.id}
                            >
                                <TextToSpeechButton
                                    text={selectedPhrase.text}
                                    lang={vocabulary.langFrom}
                                />
                                <div
                                    className="pdf-reader__annotation_info-translation"
                                >
                                    {translation}
                                </div>
                                <button
                                    className="pdf-reader__annotation_info-edit-button"
                                    onClick={() => {
                                        const { onEditClick } = this.props;
                                        onPdfScrollPositionChange(document.documentElement.scrollTop);
                                        onEditClick && onEditClick(selectedPhrase);
                                    }}
                                >
                                    Edit
                                </button>
                            </div>
                        );
                    })}
                </div>
                <div className="pdf-reader__annotation_info-buttons">
                    <button
                        className="pdf-reader__annotation_info-cancel-button"
                        onClick={() => {
                            this.setState({
                                selectedPhrase: null,
                            });
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        className="pdf-reader__annotation_info-edit-button"
                        onClick={() => {
                            const { onSelection } = this.props;
                            onPdfScrollPositionChange(document.documentElement.scrollTop);
                            // onNewClick && onNewClick();
                            onSelection && onSelection(
                                selectedPhrases[0].text,
                                document.getElementById('pdfReader').textContent,
                            );
                        }}
                    >
                        New phrase
                    </button>
                </div>
            </div>
        );
    }

    renderFooter() {
        const { vocabulary } = this.props;
        const { isSelectionDialogVisible, selectedPhrase } = this.state;
        const selectedPhrases = vocabulary.phrases.filter((phrase) => phrase.text === selectedPhrase);

        const nav = (
            <div
                className="pdf-reader__nav-container"
            >
                {this.renderNavButton('Prev', -1)}
                <input
                    type="number"
                    className="pdf-reader__nav-text-input"
                    ref={(inputPageNumber) => this.inputPageNumber = inputPageNumber}
                    value={this.state.pageNumber}
                    onChange={this.handleInputPageNumber}
                />
                / {this.state.pdfPagesNumber}
                {this.renderNavButton('Next', 1)}
            </div>
        );

        return (
            <FixedFooter>
                <div
                    className="pdf-reader__footer"
                >
                    {this.renderAnnotationConfirmation(selectedPhrases)}
                    {this.renderAnnotationDialog()}
                    {!isSelectionDialogVisible && !selectedPhrase ? nav : null}
                </div>
            </FixedFooter>
        );
    }

    renderLoader() {
        const {
            isLoading,
        } = this.state;

        return (
            <Load
                isVisible={isLoading}
                label={'Loading'}
                timeout={500}
            />
        );
    }

    render() {
        return (
            <div className="pdf-reader">
                {this.renderLoader()}
                <div
                    id="pdfReader"
                    className="pdf-reader__content"
                    ref={(pdfReader) => this.pdfReader = pdfReader}>
                </div>
                {this.renderFooter()}
            </div>
        );
    }

}

export default PDFReader;

