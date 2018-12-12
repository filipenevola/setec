import { hot } from 'react-hot-loader';
import React, { Component } from 'react';
import { Movies } from './Movies';
import { methodCall } from './methods';

class App extends Component {
  state = {
    search: '',
    moviesSearch: [],
    movies: [],
    onlyMyMovies: false,
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
    if (this.state.onlyMyMovies) {
      this.setState(({ movies }) => ({
        moviesSearch: movies.filter(movie =>
          movie.title.toLowerCase().includes(this.state.search.toLowerCase())
        ),
      }));
      return;
    }
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
    this.setState(({ movies, moviesSearch }) => ({
      movies: [...movies, movie],
      moviesSearch: [...moviesSearch, movie],
    }));
  };

  removeSavedMovie = movie => {
    this.setState(({ movies, moviesSearch }) => ({
      movies: movies.filter(m => m.id !== movie.id),
      moviesSearch: moviesSearch.filter(m => m.id !== movie.id),
    }));
  };

  toggleOnlyMyMovies = () => {
    this.setState(
      ({ onlyMyMovies }) => ({
        onlyMyMovies: !onlyMyMovies,
        moviesSearch: [],
      }),
      () => this.searchMovies()
    );
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
              <h1>
                Wantch: {this.state.onlyMyMovies ? 'My Movies' : 'Search'}
              </h1>
              <button onClick={this.toggleOnlyMyMovies}>
                My Movies ({this.state.movies.length})
              </button>
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
            onlyMyMovies={this.state.onlyMyMovies}
          />
        </div>
      </div>
    );
  }
}

export default hot(module)(App);
