import React, { Component } from 'react';
import Pagination from '../Pagination';
import './style.css';
import PhraseListItem from '../PhraseListItem';

const PER_PAGE = 10;

class VocabularyPhraseList extends Component {
    // state = {
    //     offset: 0,
    //     page: 0,
    // }

    handlePageClick = (data) => {
        const {
            navigate,
            vocabulary,
        } = this.props;
        navigate(`/vocabulary/${vocabulary.id}/page/${data.selected}`);
    }

    getPageNumber() {
        const {
            pageNumber = 0,
        } = this.props;
        const pageNumberNumeric =  parseInt(pageNumber, 10);
        if (isNaN(pageNumberNumeric)) {
            return 0;
        }
        return pageNumberNumeric;
    }
    getOffset() {
        return Math.ceil(this.getPageNumber() * PER_PAGE);
    }

    getList() {
        const {
            vocabulary: { phrases = [] },
        } = this.props;
        const offset = this.getOffset();
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
            navigate,
        } = this.props;
        const pageNumber = this.getPageNumber();

        return (
            <div>
                <Pagination
                    list={vocabulary.phrases}
                    onPageChange={this.handlePageClick}
                    perPage={PER_PAGE}
                    forcePage={pageNumber}
                />
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
                    forcePage={pageNumber}
                />
            </div>
        );
    }

}

export default VocabularyPhraseList;
