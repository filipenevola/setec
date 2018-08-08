import React from 'react';

export const Movies = ({ movies }) => (
  <div>
    {movies.map(movie => (
      <div key={movie.id}>{movie.title}</div>
    ))}
  </div>
);
