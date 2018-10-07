import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import App from '../../containers/App';
import { Provider } from 'react-redux'
import store from '../../store/';
import Search from './Search';
import { requestPopulateVocabulariesFromLocal } from '../../actions/vocabulary';
import { requestPopulateGameAnswersFromLocal } from '../../actions/game';

store.subscribe(() => {
  const state = JSON.parse(JSON.stringify(store.getState()));
  console.log(state.lastAction.type, state.lastAction.payload, state);
});

store.dispatch(requestPopulateVocabulariesFromLocal());
store.dispatch(requestPopulateGameAnswersFromLocal());
// const Main = () => {
//   return (
//     <div className="Main">
//       <Search />
//       <Provider store={store}>
//         <App />
//       </Provider>
//     </div>
//   );
// };
//
// const ourContainer = document.createElement('div');
// const readme = document.getElementById('readme');
// const article = readme.querySelector('article');
// readme.insertBefore(ourContainer, article);
// ReactDOM.render(<Main />, ourContainer);

const tooltipContainer = document.createElement('div');
tooltipContainer.setAttribute('id', 'dixme');
document.body.appendChild(tooltipContainer);

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
      getPosition(text, '\n', 0),
      //getPosition(text, '‘', 0),
      //getPosition(text, '’', 0),
      //getPosition(text, ',', 0),
      getPosition(text, '.', 1),
      getPosition(text, '!', 1),
      getPosition(text, '?', 1),
      getPosition(text, ';', 1),
      getPosition(text, '\n', 1),
      //getPosition(text, '‘', 1),
      //getPosition(text, '’', 1),
      //getPosition(text, ',', 1),
      getPosition(text, '.', 2),
      getPosition(text, '!', 2),
      getPosition(text, '?', 2),
      getPosition(text, ';', 2),
      getPosition(text, '\n', 2),
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


document.addEventListener('selectionchange', () => {
  const selection = window.getSelection();
  const phrase = selection.toString().trim().replace(/\n/g, ' ');
  if (!phrase) {
    tooltipContainer.innerHTML = '';
  }
});
document.addEventListener('keypress', (evt) => {
  const keyCombination = evt.ctrlKey && evt.code == 'KeyD';
  if (!keyCombination) {
    return;
  }
  const getMeta = ({ textPage, selection }) => {
    const index = textPage.indexOf(selection.text);

    const { startOffset, endOffset } = selection;
    const [selectionStart, selectionEnd] = [ startOffset, endOffset ].sort((a, b) => a - b);
    const { richSentence } = getSentenceData(
      textPage,
      {
        start: selectionStart + index,
        end: selectionEnd + index,
      },
    );

    return {
      text: selection.phrase,
      sourceReference: richSentence.trim(),
    };
  };
  const selection = window.getSelection();
  const phrase = selection.toString().trim().replace(/\n/g, ' ');
  if (phrase) {
    const {
      text,
      sourceReference,
    } = getMeta({
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
    tooltipContainer.innerHTML = `
      <div style="
        position: fixed;
        top: ${oRect.top - 50}px;
        left: ${oRect.left}px;
        padding: 10px;
        border: 1px solid #000;
        background: #fff;
        z-index: 1000;"
      >
        ${text}
      </div>
    `;
    console.log({
      top: document.body.scrollTop,
      text,
      sourceReference,
      oRect,
      tooltipContainer,
    });
  } else {
    tooltipContainer.innerHTML = '';
  }
});
document.addEventListener('scroll', () => {
  tooltipContainer.innerHTML = '';
});
