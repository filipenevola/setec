import React from 'react';

export const Movies = ({ movies, search }) => (
  <div>
    {movies
      .filter(movie => movie.name.toLowerCase().includes(search.toLowerCase()))
      .map(movie => (
        <div key={movie.name}>{movie.name}</div>
      ))}
  </div>
);
