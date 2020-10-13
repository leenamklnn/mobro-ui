import React, { Component } from 'react';
import './App.css';

/**
 * Component for showing movie details
 */
class MovieDetails extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const movie = this.props.movie;
    return (
      <div className="input-panel">
      <h2>{movie.name}</h2>
      <div><span className="field-name">Year:</span> {movie.year}</div>
      <div><span className="field-name">Genres:</span> {movie.genres}</div>
      <div><span className="field-name">Age limit:</span> {movie.ageLimit}</div>
      <div><span className="field-name">Rating:</span> {movie.rating}</div>
      <div><span className="field-name">Director:</span> {movie.director}</div>
      <div><span className="field-name">Synopsis:</span> {movie.synopsis}</div>
      <br/>
      <button onClick={() => this.onDelete()}>Delete</button>&nbsp;
      </div>
    );
  }

  onDelete() {
    const movie = this.props.movie;
    if(window.confirm("Are you sure to delete movie: " + movie.name + " ?")) {
      this.props.onDelete(movie.name);
    }
  }

}

export default MovieDetails;
