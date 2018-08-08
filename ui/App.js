import { hot } from 'react-hot-loader';
import React, { Component, Fragment } from 'react';
import { Movies } from './Movies';
import { methodCall } from './methods';

class App extends Component {
  state = {
    search: '',
    moviesSearch: [],
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
      .then(result => {
        const data = JSON.parse(result);
        if (!data || !data.results) {
          return;
        }
        const { results: moviesSearch } = data;
        this.setState(() => ({
          moviesSearch,
        }));
      })
      .catch(error => {
        console.error(error);
      });
  };

  componentDidMount() {
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
          <Movies movies={this.state.moviesSearch} />
        </div>
      </div>
    );
  }
}

export default hot(module)(App);
