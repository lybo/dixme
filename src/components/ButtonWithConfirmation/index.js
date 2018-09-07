import React, { Component } from 'react';
import './style.css';

class ButtonWithConfirmation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isConfimationVisible: false,
    };

    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleCancelButtonClick = this.handleCancelButtonClick.bind(this);
    this.handleConfirmButtonClick = this.handleConfirmButtonClick.bind(this);
  }

  setConfirmationVisible(isConfimationVisible) {
    this.setState({
      isConfimationVisible,
    });
  }

  handleCancelButtonClick() {
    return (e) => {
      e.stopPropagation();
      e.preventDefault();

      this.setConfirmationVisible(false);
    };
  }

  handleConfirmButtonClick() {
    const { onConfirm } = this.props;
    return (e) => {
      e.stopPropagation();
      e.preventDefault();

      this.setConfirmationVisible(false);
      onConfirm && onConfirm();
    };
  }

  handleButtonClick() {
    return (e) => {
      e.stopPropagation();
      e.preventDefault();

      const {
        onClick,
      } = this.props;

      onClick && onClick();

      this.setConfirmationVisible(true);
    };
  }

  renderButton() {
    const { isConfimationVisible } = this.state;

    if (isConfimationVisible) {
      return null;
    }

    const {
      label,
      buttonClassName,
    } = this.props;

    return (
      <div
        className={`button-with-confirmation__button-wrapper`}
      >
        <button
          className={`button-with-confirmation__button ${buttonClassName}`}
          onClick={this.handleButtonClick()}
        >
          {label}
        </button>
      </div>
    );
  }

  renderConfirmation() {
    const { isConfimationVisible } = this.state;

    if (!isConfimationVisible) {
      return null;
    }

    const {
      confirmationMessage,
      confirmationClassName,
      confirmationButtonClassName,
      confirmationCancelClassName,
      isConfimationButtonsVisible,
    } = this.props;

    if (isConfimationButtonsVisible === false) {
      return null;
    }

    return (
      <div
        className={`button-with-confirmation__confirmation ${confirmationClassName}`}
      >
        {confirmationMessage}
        <div className="button-with-confirmation__buttons">
          <button
            className={`button-with-confirmation__cancel-button ${confirmationButtonClassName}`}
            onClick={this.handleCancelButtonClick()}
          >
            Cancel
          </button>
          <button
            className={`button-with-confirmation__confirmation-button ${confirmationCancelClassName}`}
            onClick={this.handleConfirmButtonClick()}
          >
            Confirm
          </button>
        </div>
      </div>
    );
  }

  render() {
    const { containerClassName } = this.props;
    return (
      <div className={`button-with-confirmation ${containerClassName}`}>
        {this.renderButton()}
        {this.renderConfirmation()}
      </div>
    );
  }

}

export default ButtonWithConfirmation;
