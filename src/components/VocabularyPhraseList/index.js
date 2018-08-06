import React, { Component } from 'react';
import Pagination from '../Pagination';
import './style.css';
import PhraseListItem from '../PhraseListItem';

const PER_PAGE = 10;

class VocabularyPhraseList extends Component {
    state = {
        pageNumber: 0,
        searchText: '',
    }

    handlePageClick = (data) => {
        this.setState({
            pageNumber: data.selected,
        });
    }

    getPageNumber() {
        const {
            pageNumber = 0,
        } = this.state;
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

        return phrases.filter(this.search).slice(start, end);
    }

    search = (phrase) => {
        const {
            searchText,
        } = this.state;
        if (!searchText) {
            return true;
        }
        return phrase.translationFrom.indexOf(searchText) !== -1;
    }

    render() {
        const {
            vocabulary,
            onEditClick,
            onDeleteClick,
            isReferenceVisible,
            navigate,
            navigateToPhraseForm,
        } = this.props;
        const {
            searchText,
        } = this.state;
        const pageNumber = this.getPageNumber();
        const filterList = vocabulary.phrases.filter(this.search);

        return (
            <div>
                <div
                    className="vocabulary__phrases-list__search-container"
                >
                    <input
                        type="text"
                        className="vocabulary__phrases-list__text-input"
                        value={searchText}
                        placeholder="Search"
                        onChange={(e) => {
                            this.setState({
                                searchText: e.target.value.trim(),
                            });
                        }}
                    />
                    {searchText && (
                        <button
                            className="vocabulary__phrases-list__button"
                            onClick={() => {
                                navigateToPhraseForm(searchText);
                            }}
                        >
                            Add
                        </button>
                    )}
                </div>
                <Pagination
                    list={filterList}
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
                    list={filterList}
                    onPageChange={this.handlePageClick}
                    perPage={PER_PAGE}
                    forcePage={pageNumber}
                />
            </div>
        );
    }

}

export default VocabularyPhraseList;
