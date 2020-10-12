import Configuration from './configuration';

class MovieService {

  constructor() {
    this.config = new Configuration();
  }


  addMovie(newMovie) {
    console.log("MovieService.addMovie():");
    console.log(newMovie);
    return fetch(this.config.ADD_MOVIE_URL, {
      method: "POST",
      mode: "cors",
        headers: {
          'Content-Type': 'application/json'
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
    return fetch(this.config.REMOVE_MOVIE_URL, {
      method: "POST",
      mode: "cors",
      headers: {
            "Content-Type": "application/json"
        },
      body: JSON.stringify({"name": movieName})
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