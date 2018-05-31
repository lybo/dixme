import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import './style.css';

class Pagination extends Component {
    render() {
        const {
            list,
            onPageChange,
            perPage,
            forcePage,
        } = this.props;

        return (
            <ReactPaginate previousLabel={"previous"}
                nextLabel={"next"}
                breakLabel={<div>...</div>}
                breakClassName={"break-me"}
                pageCount={Math.round(list.length / perPage)}
                marginPagesDisplayed={1}
                pageRangeDisplayed={2}
                onPageChange={onPageChange}
                forcePage={forcePage}
                containerClassName="pagination"
                pageLinkClassName="pagination__item"
                previousLinkClassName="pagination__previous"
                nextLinkClassName="pagination__next"
                subContainerClassName={"pages pagination"}
                activeClassName={"active"} />
        );
    }
}

export default Pagination;
