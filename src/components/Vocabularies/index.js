import React, { Component } from 'react';
import VocabularyListItem from '../VocabularyListItem/';
import './style.css';

class Vocabularies extends Component {
    constructor(props) {
        super(props);

        this.renderVocabularyListItem = this.renderVocabularyListItem.bind(this);
        this.handlerClick = this.handlerClick.bind(this);
    }

    handlerClick(vocabulary) {
        const { setVocabularySelected } = this.props;
        setVocabularySelected && setVocabularySelected(vocabulary.id);
    }

    renderVocabularyListItem(vocabulary) {
        return (
            <VocabularyListItem
                key={vocabulary.id}
                vocabulary={vocabulary}
                onClick={this.handlerClick}
            />
        );
    }

    render() {
        return (
            <div className="vocabularies">
                {this.props.vocabularies.map(this.renderVocabularyListItem)}
            </div>
        );
    }
}

export default Vocabularies;
