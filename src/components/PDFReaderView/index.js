import React, { Component } from 'react';
import './style.css';
import PDFReader from '../PDFReader';
import WebFileSystem from '../WebFileSystem';
import { getPhraseModel } from '../../reducers/phrase';
function getSentenceData(text, offset) {
    function getPosition(string, subString, index) {
        return string.split(subString, index).join(subString).length;
    }
    function getSentenceLimit(text, additional = 0) {
        const limits = [
            //text.indexOf('.'),
            //text.indexOf('!'),
            //text.indexOf('?'),
            //text.indexOf('-'),
            //text.indexOf(','),
            getPosition(text, '.', 0),
            getPosition(text, '!', 0),
            getPosition(text, '?', 0),
            getPosition(text, ';', 0),
            //getPosition(text, '‘', 0),
            //getPosition(text, '’', 0),
            //getPosition(text, ',', 0),
            getPosition(text, '.', 1),
            getPosition(text, '!', 1),
            getPosition(text, '?', 1),
            getPosition(text, ';', 1),
            //getPosition(text, '‘', 1),
            //getPosition(text, '’', 1),
            //getPosition(text, ',', 1),
            getPosition(text, '.', 2),
            getPosition(text, '!', 2),
            getPosition(text, '?', 2),
            getPosition(text, ';', 2),
            //getPosition(text, '‘', 2),
            //getPosition(text, '’', 2),
            //getPosition(text, ',', 2),
        ].filter(limit => limit !== -1 && limit !== 0);

        if (limits.length) {
            const limit = Math.min(...limits);
            return limit + additional || text.length + additional - 1;
        }

        return text.length + additional - 1;
    }

    function getStartIndex() {
        const beforeText = text.substring(0, offset.start).split('').reverse().join('');
        return offset.start - getSentenceLimit(beforeText);
    }

    function getEndIndex() {
        const endText = text.substring(offset.end, text.length);
        return offset.end + getSentenceLimit(endText, 1);
    }

    const selectedText = text.substring(offset.start, offset.end);
    const start = getStartIndex();
    const end = getEndIndex();
    const sentence = text.substring(start, end);

    const getSentencePosition = (number) => {
        return number - start;
    };

    const richSentence = sentence.substring(0, getSentencePosition(offset.start)) +
        `<b>${selectedText}</b>` +
        sentence.substring(getSentencePosition(offset.end), sentence.length)

    return {
        sentence,
        richSentence,
        start,
        end,
    };
}
class PDFReaderView extends Component {
    constructor(props) {
        super(props);

        this.handleWebFileSystemChange = this.handleWebFileSystemChange.bind(this);
        this.handleSelection = this.handleSelection.bind(this);
        this.handlePageNumberChange = this.handlePageNumberChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps);
    }

    handleWebFileSystemChange(file) {
        const { onWebFileSystemChange } = this.props;
        const pdfPath = URL.createObjectURL(file);
        onWebFileSystemChange && onWebFileSystemChange(pdfPath);
    }

    handleSelection({ textPage, selection }) {
        const index = textPage.indexOf(selection.focusNode.data);

        const { anchorOffset, focusOffset } = selection;
        const [selectionStart, selectionEnd] = [anchorOffset, focusOffset].sort((a, b) => a - b);
        const { richSentence } = getSentenceData(
            textPage,
            {
                start: selectionStart + index,
                end: selectionEnd + index,
            },
        );
        const { onSelection } = this.props;
        onSelection && onSelection(getPhraseModel({
            text: selection.toString().trim().replace(/\n/g, ' '),
            sourceReference: richSentence,
        }));
    }

    handlePageNumberChange(pageNumber) {
        const { onPageNumberChange } = this.props;
        onPageNumberChange && onPageNumberChange(pageNumber);
    }

    renderPDFContent() {
        const {
            pdfPath,
            vocabulary,
            isVisible,
            onPdfScrollPositionChange,
            onEditClick,
        } = this.props;

        if (!pdfPath) {
            return;
        }

        return (
            <PDFReader
                pdfPath={pdfPath}
                vocabulary={vocabulary}
                isVisible={isVisible}
                onSelection={this.handleSelection}
                onEditClick={(selectedPhrase) => {
                    onEditClick && onEditClick(selectedPhrase);
                }}
                onPageNumberChange={this.handlePageNumberChange}
                onPdfScrollPositionChange={onPdfScrollPositionChange}
            />
        );
    }

    render() {
        const { vocabulary, isVisible, goBack } = this.props;
        if (!vocabulary) {
            return null;
        }
        return (
            <div
                className="vocabulary__pdf-reader"
                style={{ display: isVisible ? 'block' : 'none' }}
            >
                <div className="vocabulary__pdf-reader-header">
                    <div className="vocabulary__pdf-reader-header-left">
                        <button
                            className="vocabulary__pdf-reader-back-button"
                            onClick={()=> {
                                goBack && goBack();
                            }}
                        >
                            &#8592;
                        </button>
                    </div>
                    <div className="vocabulary__pdf-reader-header-center">
                        <h1 className="vocabulary__pdf-reader-vocabulary-title">{vocabulary.title}</h1>
                    </div>
                    <div className="vocabulary__pdf-reader-header-right">
                    </div>
                </div>
                <div className="vocabulary__pdf-reader-buttons">
                    <div className="vocabulary__pdf-reader-upload-button">
                        <WebFileSystem
                            onChange={this.handleWebFileSystemChange}
                            accept={'application/pdf'}
                        />
                    </div>
                </div>
                {this.renderPDFContent()}
            </div>
        );
    }

}

export default PDFReaderView;
