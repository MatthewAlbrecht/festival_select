exports.seed = function(knex, Promise) {
  return knex('artists').del()
    .then(() => {
      return Promise.all([
        knex('artists').insert({
          id: 1,
          name: 'chance the rapper'
        }),
        knex('artists').insert({
          id: 2,
          name: 'the weeknd'
        }),
        knex('artists').insert({
          id: 3,
          name: 'twenty one pilots'
        }),
        knex('artists').insert({
          id: 4,
          name: 'flume'
        }),
        knex('artists').insert({
          id: 5,
          name: 'kaytranada'
        }),
        knex('artists').insert({
          id: 6,
          name: 'red hot chili peppers'
        })
      ]);
    });
};
