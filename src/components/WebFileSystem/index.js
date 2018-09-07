import React, { Component } from 'react';
import './style.css';

class WebFileSystem extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    if (!this.input.files || !this.input.files[0]) {
      return;
    }

    const { onChange } = this.props;
    onChange && onChange(this.input.files[0]);
  }

  render() {
    const { accept } = this.props;
    return (
      <div className="web-file-system">
        <label
          htmlFor="file"
          className="web-file-system__label"
        >
          Click here to Upload
        </label>
        <input
          type="file"
          id="file"
          onChange={this.handleChange}
          ref={(input) => this.input = input}
          accept={accept}
          className="web-file-system__input"
        />
      </div>
    );
  }

}

export default WebFileSystem;
