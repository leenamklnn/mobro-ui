import React from 'react'

const Movies = ({movies}) => {
    return (
        <div>
            <center><h1>MoBro - Movie Browser</h1></center>
            {movies.map((movie) => (
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">{movie.name}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">{movie.year}</h6>
                        <p class="card-text">{movie.synopsis}</p>
                    </div>
                </div>
            ))}
        </div>
    )
};

export default Movies