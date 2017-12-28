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
        return (
            <div className="web-file-system">
                <input
                    type="file"
                    onChange={this.handleChange}
                    ref={(input) => this.input = input}
                    accept="application/pdf"
                />
            </div>
        );
    }

}

export default WebFileSystem;
