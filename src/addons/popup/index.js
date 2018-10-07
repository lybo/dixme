import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import utils from '../../utils/';

const Popup = () => {
  const openTheUserGuide = () => {
    const brow = utils.getBrowser();
    brow.tabs.create({
        active: true,
        url: 'https://github.com/constfun/create-react-WebExtension/blob/master/packages/react-scripts/template/README.md',
    });
  };

  return (
    <div className="Popup" onClick={openTheUserGuide}>
      This popup is just an example.<br/>
      Click it to open the user guide.<br/>
      sdfsdfsdfsdfsdfsdf
    </div>
  );
};

ReactDOM.render(<Popup />, document.querySelector('main'));
