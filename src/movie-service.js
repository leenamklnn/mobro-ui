import Configuration from './configuration';

class MovieService {

  constructor() {
    this.config = new Configuration();
  }

  retrieveMovies() {
    return fetch(this.config.FETCH_MOVIES_URL)
      .then(res => res.json())
        .then((data) => {
          return data
        })
      .catch(error => {
        this.handleError(error);
      });
  }

  getMovie(movieName) {
    console.log("MovieService.getMovie():");
    console.log("Movie: " + movieName);
    return fetch(movieName)
      .then(response => {
        if (!response.ok) {
            this.handleResponseError(response);
        }
        return response.json();
      })
      .then(movie => {
          movie["link"] = movie._links.self.href;
          return movie;
        }
      )
      .catch(error => {
        this.handleError(error);
      });
  }

  addMovie(newMovie) {
    console.log("MovieService.addMovie():");
    console.log(newMovie);
    return fetch(this.config.ADD_MOVIE_URL, {
      method: "POST",
      mode: "cors",
      headers: {
            "Content-Type": "application/json"
        },
      body: JSON.stringify(newMovie)
    })
      .then(response => {
        if (!response.ok) {
            this.handleResponseError(response);
        }
        return response.json();
      })
      .catch(error => {
        this.handleError(error);
      });
  }

  deleteMovie(movieName) {
    console.log("MovieService.deleteMovie():");
    console.log(movieName);
    return fetch(this.config.ADD_MOVIE_URL, {
      method: "POST",
      mode: "cors",
      headers: {
            "Content-Type": "application/json"
        },
      body: JSON.stringify(movieName)
    })
      .then(response => {
        if (!response.ok) {
            this.handleResponseError(response);
        }
        return response.json();
      })
      .catch(error => {
        this.handleError(error);
      });
  }

  handleResponseError(response) {
      throw new Error("HTTP error, status = " + response.status);
  }

  handleError(error) {
      console.log(error.message);
  }

}

export default MovieService;