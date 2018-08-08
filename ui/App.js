import { hot } from 'react-hot-loader';
import React, { Component, Fragment } from 'react';
import { Movies } from './Movies';

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
        name: 'Movie O 1',
        duration: 60,
      },
      {
        name: 'Movie I 2',
        duration: 120,
      },
      {
        name: 'Movie O 3',
        duration: 90,
      },
      {
        name: 'Movie E 4',
        duration: 120,
      },
      {
        name: 'Movie E 5',
        duration: 90,
      },
    ];
    return (
      <Fragment>
        <div>
          <input onChange={this.onSearch} value={this.state.search} />
        </div>
        <div>{this.state.search}</div>
        <div>
          {movies && <Movies movies={movies} search={this.state.search} />}
        </div>
      </Fragment>
    );
  }
}

export default hot(module)(App);
