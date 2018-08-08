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
    this.setState(() => ({ search }));
  };

  componentDidMount() {
    methodCall('moviesSearch').then(moviesSearch => {
      this.setState(() => ({
        moviesSearch,
      }));
    });
  }

  render() {
    return (
      <Fragment>
        <div>
          <input onChange={this.onSearch} value={this.state.search} />
        </div>
        <div>{this.state.search}</div>
        <div>
          {this.state.moviesSearch && (
            <Movies
              movies={this.state.moviesSearch}
              search={this.state.search}
            />
          )}
        </div>
      </Fragment>
    );
  }
}

export default hot(module)(App);
