import React from 'react';
import { getImageUrl } from '../api/moviesHelpers';

const MAX_OVERVIEW_LENGTH = 250;

export const Movies = ({ movies }) => (
  <div className="movie-list">
    {movies.map(({ id, title, overview, poster_path: posterPath }) => {
      const overviewFormatted =
        overview && overview.length > MAX_OVERVIEW_LENGTH
          ? `${overview.substring(0, MAX_OVERVIEW_LENGTH)}...`
          : overview;
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
              <div className="movie-description">{overviewFormatted}</div>
            </div>
          </div>
        </div>
      );
    })}
  </div>
);
