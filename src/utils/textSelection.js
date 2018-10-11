export function getSentenceData(text, offset) {
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

export function getPhrase({ textPage, selection }) {
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
}
