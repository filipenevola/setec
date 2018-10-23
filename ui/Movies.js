import React, { Component } from 'react';
import { getImageUrl } from '../api/moviesHelpers';
import { methodCall } from './methods';

export class Movies extends Component {
  saveMovie = movie => () => {
    const { addSavedMovie, removeSavedMovie } = this.props;
    addSavedMovie(movie);
    methodCall('movieSave', movie)
      .then(_id => console.log('_id', _id))
      .catch(error => {
        removeSavedMovie(movie);
        alert('Ihhh, nao salvou');
        console.error('Deu erro ao salvar', error);
      });
  };

  removeMovie = movie => () => {
    const { addSavedMovie, removeSavedMovie } = this.props;
    removeSavedMovie(movie);
    methodCall('movieRemove', movie)
      .then(id => console.log('id', id))
      .catch(error => {
        addSavedMovie(movie);
        alert('Ihhh, nao removeu');
        console.error('Deu erro ao remover', error);
      });
  };

  render() {
    const { moviesSearch, movies } = this.props;
    return (
      <div className="movie-list">
        {moviesSearch.map(movie => {
          const { id, title, overview, poster_path: posterPath } = movie;
          const showAddMovie = !movies || !movies.find(m => m.id === movie.id);
          const showRemoveMovie = movies && movies.find(m => m.id === movie.id);
          return (
            <div key={id} className="movie-item">
              <div className="movie">
                <div className="movie-image">
                  <img src={getImageUrl(posterPath)} />
                </div>

                <div className="movie-content">
                  <div className="movie-title">
                    <strong>{title}</strong>
                  </div>
                  <div className="movie-description">{overview}</div>
                  {showAddMovie && (
                    <button onClick={this.saveMovie(movie)}>Wantch!</button>
                  )}
                  {showRemoveMovie && (
                    <button onClick={this.removeMovie(movie)}>Remove!</button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
