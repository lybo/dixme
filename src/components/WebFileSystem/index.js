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
            <button className="web-file-system">
                Click here to Upload
                <input
                    type="file"
                    onChange={this.handleChange}
                    ref={(input) => this.input = input}
                    accept={accept}
                    className="web-file-system__input"
                />
            </button>
        );
    }

}

export default WebFileSystem;
