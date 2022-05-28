import React, { Component } from 'react';
import { getMovies, deleteMovie } from '../Services/movieService';
import Pagination from './common/pagintation';
import { paginate } from './common/utils/paginate';
import Genres from './common/genre';
import { getGenres } from '../Services/genreService';
import MoviesTable from './moviesTables';
import { Link } from "react-router-dom";
import SearchBox from './searchbox';
import _ from 'lodash';
import { toast } from "react-toastify";


class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        pageSize: 4,
        searchQuery: "",
        selectedGenre: null,
        crntPage: 1,
        sortColumn: { path: 'title', order: 'asc' }
    }

    async componentDidMount() {
        const { data } = await getGenres();
        const genres = [{ _id: "", name: "All Genres" }, ...data];

        const { data: movies } = await getMovies();
        this.setState({ movies, genres })
    };


    handleDelete = async movie => {
        const originalMovies = this.state.movies;
        const movies = originalMovies.filter(m => m._id !== movie._id);
        this.setState({ movies });

        try {
            await deleteMovie(movie._id);
        }
        catch (ex) {
            if (ex.response && ex.response.status === 404)
                toast.error('This movie has already been deleted.');

            this.setState({ movies: originalMovies });

        }
    };



    handlePageChange = page => {
        this.setState({ crntPage: page })
    };

    handleGenre = genre => {
        this.setState({ selectedGenre: genre, crntPage: 1, searchQuery: "" });
    };

    handleSort = sortColumn => {
        this.setState({ sortColumn });
    };

    handleSearch = query => {
        this.setState({ searchQuery: query, selectedGenre: null, crntPage: 1 })
    };

    getPageData = () => {
        const {
            pageSize,
            crntPage,
            movies: allMovies,
            selectedGenre,
            searchQuery,
            sortColumn
        } = this.state;

        let filtered = allMovies;
        if (searchQuery)
            filtered = allMovies.filter(m => m.title.toLowerCase().startsWith(searchQuery.toLowerCase()));

        else if (selectedGenre && selectedGenre._id)
            filtered = allMovies.filter(m => m.genre._id === selectedGenre._id)




        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

        const movies = paginate(sorted, crntPage, pageSize);

        return { totalCount: filtered.length, data: movies };
    }

    render() {
        const { length: count } = this.state.movies;
        const {
            pageSize,
            crntPage,
            sortColumn,
            searchQuery,

        } = this.state;
        const { user } = this.props;

        const { totalCount, data: movies } = this.getPageData();

        return (

            <React.Fragment>
                <div className="row mt-4">

                    <div className="col-2 ml-5">
                        <Genres items={this.state.genres}
                            selectedItem={this.state.selectedGenre}
                            onItemSelect={this.handleGenre} />
                    </div>


                    <div className="col-">
                        {user && <Link to="/movies/new" className="btn btn-primary mb-2">New Movie</Link>}

                        <p> showing {totalCount} in the database </p>
                        <SearchBox value={searchQuery} onChange={this.handleSearch} />
                        <MoviesTable
                            movies={movies}
                            sortColumn={sortColumn}
                            onDelete={this.handleDelete}
                            onSort={this.handleSort}
                        />

                        <Pagination
                            itemsCount={totalCount}
                            pageSize={pageSize}
                            onPageChange={this.handlePageChange}
                            crntPage={crntPage} />
                    </div>


                </div>
            </React.Fragment>);
    }
}


export default Movies;