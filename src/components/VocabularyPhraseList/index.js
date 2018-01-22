import React, { Component } from 'react';
import './style.css';
import PhraseListItem from '../PhraseListItem';

class VocabularyPhraseList extends Component {
    render() {
        const {
            vocabulary,
            onEditClick,
            onDeleteClick,
            isReferenceVisible,
        } = this.props;

        return (
            <div className="vocabulary-phrase-list">
                {vocabulary.phrases
                        .filter(phrase => phrase)
                        .map((phrase) => {
                            return (
                                <PhraseListItem
                                    key={phrase.id}
                                    vocabulary={vocabulary}
                                    onDeleteClick={onDeleteClick}
                                    onEditClick={onEditClick}
                                    phrase={phrase}
                                    isReferenceVisible={isReferenceVisible}
                                />
                            );
                        })
                }
            </div>
        );
    }

}

export default VocabularyPhraseList;
