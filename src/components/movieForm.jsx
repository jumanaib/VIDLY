import React from 'react';

const MovieForm = ({ match, history }) => {
    return (
        <div>
            <h>MovieForm {match.params.id}</h>
            <button className="btn-primary" onClick={() => history.push("/movies")}>Save</button>
        </div>
    );
}

export default MovieForm;