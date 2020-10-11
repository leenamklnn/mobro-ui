import React, { Component } from 'react';
import './App.css';
import MovieDetails from './movie-details';
import NewMovie from './new-movie';
import MovieService from './movie-service';
import Configuration from './configuration';
import Movies from './movies';

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

  componentDidMount() {
      this.getMovies();
  }

  render() {
    const showDetails = this.state.showDetails;
    const selectedMovie = this.state.selectedMovie;
    const newMovie = this.state.newMovie;

    const listMovies = this.state.movies.map((movie) =>
      <li key={movie.name} onClick={() => this.onSelect(movie.name)}>
         <span className="movie-name">{movie.name}</span>
      </li>
    );

    return (
      <div className="App">
        <Movies movies={this.state.movies} />
        <br/>
        <ul className="movies">
           {listMovies}
        </ul>
        <br/>
        <button type="button" name="button" onClick={() => this.onNewMovie()}>Add movie</button>
        <br/>
        {newMovie && <NewMovie onSubmit={this.onCreateMovie} onCancel={this.onCancel}/>}
        {showDetails && selectedMovie && <MovieDetails item={selectedMovie} onDelete={this.onDeleteMovie} />}
      </div>
    );
  }

  getMovies() {
    fetch(this.config.FETCH_MOVIES_URL)
                .then(res => res.json())
                .then((data) => {
                    this.setState({ movies: data })
                })
                .catch(console.log)
  }

  onSelect(movieName) {
      this.clearState();
      this.movieService.getMovie(movieName).then(movie => {
        this.setState({
            showDetails: true,
            selectedMovie: movie
          });
        }
      );
    }

  onCancel() {
    this.clearState();
  }

  onNewMovie() {
    this.clearState();
    this.setState({
      newMovie: true
    });
  }

  onCreateMovie(newMovie) {
    this.clearState();
    this.movieService.addMovie(newMovie).then(movie => {
        this.getMovies();
      }
    );
  }

  onDeleteMovie(movieLink) {
    this.clearState();
    this.movieService.deleteMovie(movieLink).then(res => {
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