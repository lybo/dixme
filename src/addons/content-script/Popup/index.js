import React from 'react';
import ReactModal from 'react-modal';
import './style.css';

// const customStyles = {
//   content : {
//     top: '50%',
//     left: '50%',
//     right: 'auto',
//     bottom: 'auto',
//     marginRight: '-50%',
//     transform: 'translate(-50%, -50%)',
//     overflow: 'auto',
//     userSelect: 'none',
//   }
// };

export default class Popup extends React.Component {
  render() {
    const {
      close,
      showModal,
      children,
    } = this.props;
    return (
      <div className='popup'>
        <ReactModal
          isOpen={showModal}
          contentLabel="Translate"
          onRequestClose={close}
          shouldCloseOnOverlayClick={false}
          className="popup__modal"
          overlayClassName="popup__overlay"
          closeTimeoutMS={150}
          ariaHideApp={false}
        >
          <button onClick={close}>Close Modal</button>
          {children}
        </ReactModal>
      </div>
    );
  }
}

