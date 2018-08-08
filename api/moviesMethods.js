import { Meteor } from 'meteor/meteor';
import { searchMovies } from './moviesRest';

Meteor.methods({
  moviesSearch(query) {
    return searchMovies({ query });
  },
});
