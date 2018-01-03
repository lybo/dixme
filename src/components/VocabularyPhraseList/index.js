import React, { Component } from 'react';
import './style.css';
import PhraseListItem from '../PhraseListItem';

class VocabularyPhraseList extends Component {
    render() {
        const {
            vocabulary,
            onEditClick,
            onDeleteClick,
            selectedPhraseId,
            isReferenceVisible,
        } = this.props;

        return (
            <div className="vocabulary-phrase-list">
                {vocabulary.phrases
                        .filter(phrase => phrase)
                        .filter(phrase => {
                            if (!selectedPhraseId){
                                return true;
                            }

                            return phrase.id === selectedPhraseId;
                        })
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
