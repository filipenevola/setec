import { Meteor } from 'meteor/meteor';
import pick from 'lodash.pick';
import { searchMovies } from './moviesRest';
import { MoviesCollection } from '../data/MoviesCollection';
import { MAX_OVERVIEW_LENGTH, truncate } from '../data/moviesConstants';

const MOVIE_FIELDS = ['id', 'title', 'poster_path', 'vote_average', 'overview'];

Meteor.methods({
  moviesSearch(query) {
    return searchMovies({ query }).then(result => {
      const data = JSON.parse(result);
      if (!data || !data.results) {
        return [];
      }
      // reducing data transfer
      return data.results
        .map(movie => pick(movie, MOVIE_FIELDS))
        .map(movie => ({
          ...movie,
          overview: truncate(movie.overview, MAX_OVERVIEW_LENGTH),
        }));
    });
  },
  movieSave(movie) {
    if (movie && movie.title && movie.title.toLowerCase().includes('spider')) {
      throw new Error('Nao pode salvar filmes com Spider');
    }
    return MoviesCollection.insert(pick(movie, MOVIE_FIELDS));
  },
  movieRemove(movie) {
    if (movie && movie.title && movie.title.toLowerCase().includes('fast')) {
      throw new Error('Nao pode remover filmes com Fast');
    }
    // TODO proxima aula, remover pelo _id do mongo
    MoviesCollection.remove({ id: movie.id });
    return movie.id;
  },
  movies() {
    return MoviesCollection.find().fetch();
  },
});
