import React from 'react';

export const Movies = ({ movies, search }) => {
  return movies
    .filter(movie => movie.name.toLowerCase().includes(search.toLowerCase()))
    .map(movie => movie.name)
    .join(', ');
};
