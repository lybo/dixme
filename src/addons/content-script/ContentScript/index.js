import React from 'react';
import { connect } from 'react-redux';
import Mark from 'mark.js';
import utils from '../../../utils';
import Popup from '../Popup';
import PopupContent from '../PopupContent';
import './style.css';
import { getPhraseModel } from '../../../reducers/phrase';
import { getModelVocabulary } from '../../../reducers/vocabulary';

// function getCoords(dimensions) { // crossbrowser version
//   const body = document.body;
//   const docEl = document.documentElement;
//
//   const scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
//   const scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;
//
//   const clientTop = docEl.clientTop || body.clientTop || 0;
//   const clientLeft = docEl.clientLeft || body.clientLeft || 0;
//
//   const top  = dimensions.top +  scrollTop - clientTop;
//   const left = dimensions.left + scrollLeft - clientLeft;
//
//   return {
//     top: Math.round(top),
//     left: Math.round(left),
//   };
// }
class ContentScript extends React.Component {
  state = {
    dimensions: null,
    text: '',
    sourceReference: '',
    showModal: false,
    phraseId: null,
  }

  componentWillMount() {
    // document.addEventListener('selectionchange', () => {
    //   const selection = window.getSelection();
    //   const phrase = selection.toString().trim().replace(/\n/g, ' ');
    //   if (!phrase) {
    //     this.setEmpty();
    //   }
    // });

    document.addEventListener('keydown', (evt) => {
      const isEscape = evt.keyCode === 27;
      if (isEscape) {
        this.setEmpty();
        return;
      }
      const keyCombination = evt.ctrlKey && evt.code === 'KeyD';
      if (!keyCombination) {
        return;
      }
      const selection = window.getSelection();
      const phrase = selection.toString().trim().replace(/\n/g, ' ');
      if (!phrase) {
        this.setEmpty();
        return;
      }

      const {
        text,
        sourceReference,
      } = utils.getPhrase({
        textPage: selection.focusNode.parentElement.parentElement.textContent,
        selection: {
          text: selection.focusNode.data,
          phrase,
          startOffset: selection.anchorOffset,
          endOffset: selection.focusOffset,
        },
      });
      const oRange = selection.getRangeAt(0); //get the text range
      const oRect = oRange.getBoundingClientRect();
      // position: absolute;
      // top: ${document.body.scrollTop + oRect.top - 50}px;
      console.log({
        top: document.body.scrollTop,
        text,
        sourceReference,
        oRect,
      });
      this.setState({
        text,
        sourceReference,
        dimensions: oRect,
        showModal: true,
      });
    });

  }

  componentWillReceiveProps(nextProps) {
    const phrases = nextProps.vocabulary.phrases.map(phrase => phrase.text);
    const className = 'dixme-phrase';
    const instance = new Mark(document.querySelector('body'));
    instance.mark(phrases, {
      className,
      accuracy: 'exactly',
      separateWordSearch: false,
      element: 'span',
      done: () => {
        const annotations = document.querySelectorAll(`.${className}`);
        console.log(annotations);
        [].forEach.call(annotations, (annotation) => {
          annotation.removeEventListener('click', this.handleAnnotationClick);
          annotation.addEventListener('click', this.handleAnnotationClick);
        });
      },
    });

  }

  handleAnnotationClick = (evt) => {
    const {
      vocabulary,
    } = this.props;
    const phraseText = evt.currentTarget.textContent;
    const selectedPhrase = vocabulary.phrases.find(p => p.text === phraseText);
    if (selectedPhrase) {
      this.setState({
        phraseId: selectedPhrase.id,
        showModal: true,
      });
    }
  }

  setEmpty = () => {
    this.setState({
      dimensions: null,
      text: '',
      sourceReference: '',
    });
  }

  close = () => {
    this.setState({ showModal: false });
  }

  getPopupContentProps() {
    const {
      text,
      sourceReference,
      phraseId,
    } = this.state;
    const {
      vocabulary,
    } = this.props;

    const getPhrase = () => {
      const selectedPhrase = vocabulary && vocabulary.phrases.find(p => p.id === phraseId);
      if (selectedPhrase) {
        return selectedPhrase;
      }

      return getPhraseModel({
        text,
        sourceReference,
        translationFrom: text,
      });
    };

    const selectedPhrase = getPhrase();

    return {
      vocabulary,
      selectedPhrase,
    };
  }

  render() {
    const {
      text,
      phraseId,
      showModal,
    } = this.state;

    if (!text && !phraseId) {
      return null;
    }

    // const style = getCoords(dimensions);

    const {
      vocabulary,
      selectedPhrase,
    } = this.getPopupContentProps();
    return (
      <Popup
        showModal={showModal}
        close={this.close}
      >
        <PopupContent
          vocabulary={vocabulary}
          selectedPhrase={selectedPhrase}
          onClose={() => this.setEmpty()}
        />
      </Popup>
    );
  }
}

export default connect(
  (state, ownProps) => {
    const getVocabulary = () => {
      const {
        vocabularies,
      } = state;
      const vocabularyUrl = document.referrer;
      const vocabulary = vocabularies.find(v => v.url === vocabularyUrl);
      if (vocabulary) {
        return vocabulary;
      }

      return getModelVocabulary({
        langFrom: 'en',
        langTo: 'el',
        url: vocabularyUrl,
        title: document.querySelector('title').innerText,
      });
    };
    return {
      vocabularies: state.vocabularies,
      vocabulary: getVocabulary(),
    };
  },
  null,
)(ContentScript);
