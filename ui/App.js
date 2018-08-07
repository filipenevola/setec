import { hot } from 'react-hot-loader';
import React, { Component } from 'react';

class App extends Component {
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
      movies &&
      movies
        .filter(movie => movie.duration < 120)
        .map(movie => movie.name)
        .join(', ')
    );
  }
}

export default hot(module)(App);
