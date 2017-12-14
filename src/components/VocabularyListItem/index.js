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
            <div className="VocabularyListItem">
                <a
                    href="#"
                    onClick={this.handlerClick()}
                >
                    {vocabulary.id} - {vocabulary.title}
                </a>
            </div>
        );
    }
}

export default VocabularyListItem;
