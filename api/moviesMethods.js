import { Meteor } from 'meteor/meteor';

Meteor.methods({
  moviesSearch(query) {
    return [
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
    ].filter(movie => movie.name.toLowerCase().includes(query.toLowerCase()));
  },
});
