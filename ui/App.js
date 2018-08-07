import { hot } from 'react-hot-loader';
import React, { Component, Fragment } from 'react';

class App extends Component {
  state = {
    search: '',
  };

  onSearch = ({ target: { value: search } }) => {
    this.setState(() => ({ search }));
  };

  render() {
    const movies = [
      {
        name: 'Movie 1',
        duration: 60,
      },
      {
        name: 'Movie 2',
        duration: 120,
      },
      {
        name: 'Movie 3',
        duration: 90,
      },
    ];
    return (
      <Fragment>
        <div>
          {movies &&
            movies
              .filter(movie => movie.duration < 120)
              .map(movie => movie.name)
              .join(', ')}
        </div>
        <div>
          <input onChange={this.onSearch} value={this.state.search} />
        </div>
        <div>{this.state.search}</div>
      </Fragment>
    );
  }
}

export default hot(module)(App);
