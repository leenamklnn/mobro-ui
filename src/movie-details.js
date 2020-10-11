import React, { Component } from 'react';
import './App.css';

class MovieDetails extends Component {

  constructor(props) {
    super(props);
    this.onEdit = this.onEdit.bind(this);
  }

  render() {
    const movie = this.props.movie;
    return (
      <div className="input-panel">
      <span className="form-caption">{movie.name}</span>
      <div><span className="field-name">Name:</span><br/> {movie.name}</div>
      <div><span className="field-name">Year:</span><br/> {movie.year}</div>
      <div><span className="field-name">Genres:</span><br/> {movie.genres}</div>
      <div><span className="field-name">Age limit:</span><br/> {movie.ageLimit}</div>
      <div><span className="field-name">Rating:</span><br/> {movie.rating}</div>
      <div><span className="field-name">Director:</span><br/> {movie.director}</div>
      <div><span className="field-name">Synopsis:</span><br/> {movie.synopsis}</div>
      <br/>
      <button onClick={() => this.onDelete()}>Delete</button>&nbsp;
      </div>
    );
  }

  onDelete() {
    const movie = this.props.movie;
    if(window.confirm("Are you sure to delete movie: " + movie.name + " ?")) {
      this.props.onDelete(movie.link);
    }
  }

}

export default MovieDetails;
