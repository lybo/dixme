import React, { Component } from 'react';
import './style.css';
import PDFReader from '../PDFReader';
import WebFileSystem from '../WebFileSystem';
import { getPhraseModel } from '../../reducers/phrase';
import utils from '../../utils';
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
    const {
      text,
      sourceReference,
    } = utils.getPhrase({ textPage, selection });
    const { onSelection } = this.props;
    onSelection && onSelection(getPhraseModel({
      text,
      sourceReference,
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
