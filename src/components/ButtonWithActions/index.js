import React, { Component } from 'react';
import './style.css';

class ButtonWithConfirmation extends Component {
  handleCancelButtonClick = () => {
    const {
      onCancelClick,
    } = this.props;
    return (e) => {
      e.stopPropagation();
      e.preventDefault();

      onCancelClick && onCancelClick();
    };
  }

  handleButtonClick = () => {
    return (e) => {
      e.stopPropagation();
      e.preventDefault();

      const {
        onClick,
      } = this.props;

      onClick && onClick();
    };
  }

  renderButton() {
    const {
      showButtons,
    } = this.props;

    if (showButtons) {
      return null;
    }

    const {
      label,
      buttonClassName,
    } = this.props;

    return (
      <div
        className={`button-with-actions__button-wrapper`}
      >
        <button
          className={`button-with-actions__button ${buttonClassName}`}
          onClick={this.handleButtonClick()}
        >
          {label}
        </button>
      </div>
    );
  }

  renderButtons() {
    const {
      buttons,
      showButtons,
    } = this.props;

    if (!showButtons || !buttons.length) {
      return null;
    }

    const {
      text,
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
        className={`button-with-actions__confirmation ${confirmationClassName}`}
      >
        {text}
        <div className="button-with-actions__buttons">
          <button
            className={`button-with-actions__cancel-button ${confirmationButtonClassName}`}
            onClick={this.handleCancelButtonClick()}
          >
            Cancel
          </button>
          <div className="button-with-actions__action-buttons">
            {buttons.map(button => (
              <button
                key={`button-action-${button.label}`}
                className={`button-with-actions__confirmation-button ${confirmationCancelClassName}`}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();

                  button.onClick && button.onClick();
                }}
              >
                {button.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { containerClassName } = this.props;
    return (
      <div className={`button-with-actions ${containerClassName}`}>
        {this.renderButton()}
        {this.renderButtons()}
      </div>
    );
  }

}

export default ButtonWithConfirmation;
