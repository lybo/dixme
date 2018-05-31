import React, { Component } from 'react';
import Pagination from '../Pagination';
import './style.css';
import PhraseListItem from '../PhraseListItem';

const PER_PAGE = 1;

class VocabularyPhraseList extends Component {
    state = {
        offset: 0
    }

    handlePageClick = (data) => {
        const offset = Math.ceil(data.selected * PER_PAGE);

        this.setState({
            offset
        });
    }

    getList() {
        const {
            vocabulary: { phrases = [] },
        } = this.props;
        const {
            offset,
        } = this.state;

        const start = offset;
        const end = offset + PER_PAGE;

        return phrases.slice(start, end);
    }

    render() {
        const {
            vocabulary,
            onEditClick,
            onDeleteClick,
            isReferenceVisible,
        } = this.props;

        return (
            <div>
                <div className="vocabulary-phrase-list">
                    {this.getList()
                        .filter(phrase => phrase)
                        .map((phrase) => {
                            return (
                                <PhraseListItem
                                    key={phrase.id}
                                    vocabulary={vocabulary}
                                    onDeleteClick={onDeleteClick}
                                    onEditClick={onEditClick}
                                    phrase={phrase}
                                    lang={vocabulary.langFrom}
                                    isReferenceVisible={isReferenceVisible}
                                />
                            );
                        })
                    }
                </div>
                <Pagination
                    list={vocabulary.phrases}
                    onPageChange={this.handlePageClick}
                    perPage={PER_PAGE}
                />
            </div>
        );
    }

}

export default VocabularyPhraseList;
