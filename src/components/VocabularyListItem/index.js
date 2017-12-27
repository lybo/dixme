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
        return (
            <div className="vocabulary-list-item">
                <a
                    href="#"
                    onClick={this.handlerClick()}
                    className="vocabulary-list-item__link"
                >
                    <div className="vocabulary-list-item__title">{vocabulary.title}</div>
                    <div className="vocabulary-list-item__number-of-phrases">({vocabulary.phrases.length})</div>
                </a>
            </div>
        );
    }
}

export default VocabularyListItem;
