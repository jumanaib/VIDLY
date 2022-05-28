import React from 'react';
import Table from "./common/table";
import { Link } from "react-router-dom";
import auth from '../Services/authService';
import _ from 'lodash';

class MoviesTable extends React.Component {
    columns = [
        { path: 'title', label: 'Title', content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link> },
        { path: 'genre.name', label: 'Genre' },
        { path: 'numberInStock', label: 'Stock' },
        { path: 'dailyRentalRate', label: 'Rate' },

    ];

    deleteColumn = {
        key: 'delete',
        content: movie => (
            <button
                onClick={() => this.props.onDelete(movie)}
                className="btn btn-danger btn-sm">
                Delete
            </button>
        )
    };

    constructor() {
        super();
        const user = auth.getCurrentUser();
        if (user && user.isAdmin)
            this.columns.push(this.deleteColumn);
    }

    render() {

        const { movies, sortColumn, onSort } = this.props;

        return (
            <Table columns={this.columns}
                data={movies}
                sortColumn={sortColumn}
                onSort={onSort}
            />
        );
    }
}


export default MoviesTable;