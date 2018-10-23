import { hot } from 'react-hot-loader';
import React, { Component } from 'react';
import { Movies } from './Movies';
import { methodCall } from './methods';

class App extends Component {
  state = {
    search: '',
    moviesSearch: [],
    movies: [],
  };

  onSearch = ({ target: { value: search } }) => {
    this.setState(
      () => ({ search }),
      () => {
        this.searchMovies();
      }
    );
  };

  searchMovies = () => {
    methodCall('moviesSearch', this.state.search)
      .then(moviesSearch => {
        this.setState(() => ({
          moviesSearch,
        }));
      })
      .catch(error => {
        console.error(error);
      });
  };

  loadMovies = () => {
    methodCall('movies')
      .then(movies => {
        this.setState(() => ({
          movies,
        }));
      })
      .catch(error => {
        console.error(error);
      });
  };

  addSavedMovie = movie => {
    this.setState(({ movies }) => ({ movies: [...movies, movie] }));
  };

  removeSavedMovie = movie => {
    this.setState(({ movies }) => ({
      movies: movies.filter(m => m.id !== movie.id),
    }));
  };

  componentDidMount() {
    this.loadMovies();
    this.searchMovies();
  }

  render() {
    return (
      <div className="app">
        <header>
          <div className="app-bar">
            <div className="app-header">
              <h1>Wantch</h1>
            </div>
          </div>
          <div className="movie-search">
            <div>
              <i className="material-icons">search</i>
            </div>
            <div className="movie-search-text">
              <input
                type="text"
                value={this.state.search}
                placeholder="Type the movie that you want to watch..."
                onChange={this.onSearch}
              />
            </div>
          </div>
        </header>
        <div className="main">
          <Movies
            moviesSearch={this.state.moviesSearch}
            movies={this.state.movies}
            addSavedMovie={this.addSavedMovie}
            removeSavedMovie={this.removeSavedMovie}
          />
        </div>
      </div>
    );
  }
}

export default hot(module)(App);
