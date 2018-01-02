import React, { Component } from 'react';
import WebFileSystem from '../WebFileSystem/';
import './style.css';

class ImportVocabularyForm extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    // TODO: refactor the following
    handleChange(file) {
        const url = URL.createObjectURL(file);
        const xhr = new XMLHttpRequest;
        xhr.responseType = 'blob';

        xhr.onload = () => {
            var recoveredBlob = xhr.response;
            const reader = new FileReader;

            reader.onload = () => {
                const json = reader.result;
                const { onChange } = this.props;
                onChange && onChange(JSON.parse(json));
            };

            reader.readAsText(recoveredBlob);
        };

        xhr.open('GET', url);
        xhr.send();
    }

    render() {
        return (
            <div className="import-vocabulary-form">
                <WebFileSystem
                    onChange={this.handleChange}
                    accept={'application/json'}
                />
            </div>
        );
    }
}

export default ImportVocabularyForm;
