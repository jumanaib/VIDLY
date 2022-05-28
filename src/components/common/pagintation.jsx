import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const Pagination = (props) => {

    const { itemsCount, pageSize, crntPage, onPageChange } = props;

    const pagesCount = Math.ceil(itemsCount / pageSize);
    const pages = _.range(1, pagesCount + 1);

    if (pagesCount === 1) return null;

    return <nav aria-label="Page navigation example">
        <ul className="pagination">
            {pages.map(page => (
                <li key={page} className={page === crntPage ? 'page-item active' : 'page-item'}  >
                    <a className="page-link" onClick={() => onPageChange(page)}>{page}</a></li>
            ))}
        </ul>
    </nav>
}

Pagination.propTypes = {

    itemsCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    crntPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired
};

export default Pagination;