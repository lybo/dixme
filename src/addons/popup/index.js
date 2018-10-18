import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import utils from '../../utils/';

const Popup = () => {
  const openTheUserGuide = () => {
    const brow = utils.getBrowser();
    if (brow.runtime.openOptionsPage) {
      brow.runtime.openOptionsPage();
    } else {
      window.open(brow.runtime.getURL('addons-options.html'));
    }
  };

  return (
    <div className="Popup" onClick={openTheUserGuide}>
      Go to vocabularies
      <br />
      {document.referrer}
    </div>
  );
};

ReactDOM.render(<Popup />, document.querySelector('main'));
