import React, { Component } from 'react';
import './style.css';

class Vocabulary extends Component {
    constructor(props) {
        super(props);
    }

    renderPhraseListItem(phrase) {
        return (
            <div key={phrase.id}>{phrase.text}: {phrase.translation}</div>
        );
    }

    render() {
        const { vocabulary } = this.props;
        return (
            <div className="Vocabulary">
                {vocabulary.phrases.map(this.renderPhraseListItem)}
            </div>
        );
    }
}

export default Vocabulary;
