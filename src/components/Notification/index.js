import React, { Component } from 'react';
import { DONE } from '../../constants/request';
import ERROR_CODES from './codes';
import './style.css';

class Notification extends Component {
  state = {
    messages: [],
  }

  removeMessages() {
    this.refreshIntervalId && clearInterval(this.refreshIntervalId);
    this.refreshIntervalId = setInterval(() => {
      if (this.state.messages.length) {
        this.setState({
          messages: this.state.messages.slice(1),
        });
      } else {
        clearInterval(this.refreshIntervalId);
      }
    }, 3000);
  }

  componentWillReceiveProps(nextProps) {
    const {
      requests,
    } = nextProps;

    const newMessages = Object.keys(requests).reduce((acc, requestName) => {
      const { status, error } = requests[requestName];
      if (status !== DONE) {
        return acc;
      }

      return [].concat(acc, {
        requestName,
        error,
      });

    }, [])

    const messages = []
      .concat(this.state.messages, newMessages)
      .filter((s1, pos, arr) => arr.findIndex((s2) => s2.requestName === s1.requestName && s1.error === s2.error) === pos);
    this.setState({
      messages,
    });

    if (messages) {
      this.removeMessages();
    }
  }

  renderMesssage = (message) => {
    if (message.error) {
      return (
        <div
          className="notification__message"
          key={message.requestName}
        >
          <div className="notification__header">
            <i className="fa fa-exclamation-triangle notification__icon notification--error" />
            ERROR
          </div>
          {message.requestName}: {ERROR_CODES[message.error] || 'unknown'}
        </div>
      );
    }

    return (
      <div
        className="notification__message"
        key={message.requestName}
      >
        <div className="notification__header">
          <i className="fa fa-check notification__icon notification--success" />
          SUCCESS
        </div>
        {message.requestName}
      </div>
    );
  }

  render() {
    const {
      messages,
    } = this.state;

    if (!messages.length) {
      return null;
    }

    return (
      <div className="notification">
        {messages.map(this.renderMesssage)}
      </div>
    );
  }
}

export default Notification;
