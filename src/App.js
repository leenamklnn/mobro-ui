import React, { Component } from 'react';
import './App.css';
import MovieDetails from './movie-details';
import NewMovie from './new-movie';
import MovieService from './movie-service';
import Configuration from './configuration';

/**
 * Main application component
 */
class App extends Component {

  constructor(props) {
    super(props);
    this.config = new Configuration();
    this.movieService = new MovieService();

    this.onSelect = this.onSelect.bind(this);
    this.onNewMovie = this.onNewMovie.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onCreateMovie = this.onCreateMovie.bind(this);
    this.onDeleteMovie = this.onDeleteMovie.bind(this);

    this.state = {
      showDetails: false,
      selectedMovie: null,
      newMovie: null,
      movies: []
    }
  }

  /**
   * Load data before rendering
   */
  componentDidMount() {
      this.getMovies();
  }

  /**
   * Render the UI
   */
  render() {
    const showDetails = this.state.showDetails;
    const selectedMovie = this.state.selectedMovie;
    const newMovie = this.state.newMovie;

    const listMovies = this.state.movies.map((movie) =>
      <li key={movie.name} onClick={() => this.onSelect(movie)}>
         <span className="movie-name">{movie.name}</span>&nbsp;|&nbsp; {movie.year}
      </li>
    );

    return (
      <div className="App">
        <center><h1>MoBro - The Greatest Movie Browser Ever</h1></center>
        <br/>
        <button type="button" name="button" onClick={() => this.onNewMovie()}>Add movie</button>
        <br/>
        <ul className="movies">
           {listMovies}
        </ul>
        <br/>
        {newMovie && <NewMovie onSubmit={this.onCreateMovie} onCancel={this.onCancel}/>}
        {showDetails && selectedMovie && <MovieDetails movie={selectedMovie} onDelete={this.onDeleteMovie} />}
      </div>
    );
  }

  /**
   * Fetch movies from the backend server
   */
  getMovies() {
    fetch(this.config.FETCH_MOVIES_URL)
                .then(res => res.json())
                .then((data) => {
                    this.setState({ movies: data })
                })
                .catch(console.log);
  }

  /**
   * Handle movie selection
   */
  onSelect(movie) {
      this.clearState();
      this.setState({
        showDetails: true,
        selectedMovie: movie
      });
    }

  onCancel() {
    this.clearState();
  }

  /**
   * Handle state change when new movie component is shown
   */
  onNewMovie() {
    this.clearState();
    this.setState({
      newMovie: true
    });
  }

  /**
   * Handle creating a new movie - call the backend server to add
   */
  onCreateMovie(newMovie) {
    this.clearState();
    this.movieService.addMovie(newMovie).then(res => {
        this.getMovies();
      }
    );
  }

  /**
   * Handle movie deletion - call the backend server to remove
   */
  onDeleteMovie(movieName) {
    this.clearState();
    this.movieService.deleteMovie(movieName).then(res => {
        this.getMovies();
      }
    );
  }

  clearState() {
    this.setState({
      showDetails: false,
      selectedMovie: null,
      newMovie: null
    });
  }
}

export default App;