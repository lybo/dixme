import React, { Component } from 'react';
import './style.css';

class VocabularyListItem extends Component {
    constructor(props) {
        super(props);

        this.handlerClick = this.handlerClick.bind(this);
    }

    handlerClick() {
        const { vocabulary, onClick } = this.props;

        return (e) => {
            e.stopPropagation();
            e.preventDefault();
            onClick && onClick(vocabulary);
        }
    }

    render() {
        const { vocabulary } = this.props;
        const numberOfPhraseWithReference = vocabulary.phrases.filter(phrase => phrase.translationReference !== '').length;
        const pecentageOfPhraseWithReference = (100 * numberOfPhraseWithReference) / vocabulary.phrases.length;
        const details = `, ${numberOfPhraseWithReference} phrases with reference (${pecentageOfPhraseWithReference}%)`;

        return (
            <div className="vocabulary-list-item">
                <button
                    onClick={this.handlerClick()}
                    className="vocabulary-list-item__link"
                >
                    <div className="vocabulary-list-item__title">
                        {vocabulary.title}
                    </div>
                    <div className="vocabulary-list-item__details">
                        <div className="vocabulary-list-item__number-of-phrases">
                            {vocabulary.phrases.length} phrases
                            {vocabulary.phrases.length ? details : null}
                        </div>
                    </div>
                </button>
            </div>
        );
    }
}

export default VocabularyListItem;
