exports.seed = function(knex, Promise) {
  return knex('artist_at_festivals').del()
    .then(() => {
      return Promise.all([
        knex('artist_at_festivals').insert({
          id: 1,
          festival_id: 3,
          artist_id: 1
        }),
        knex('artist_at_festivals').insert({
          id: 2,
          festival_id: 1,
          artist_id: 1
        }),
        knex('artist_at_festivals').insert({
          id: 3,
          festival_id: 4,
          artist_id: 1
        }),
        knex('artist_at_festivals').insert({
          id: 4,
          festival_id: 7,
          artist_id: 1
        }),
        knex('artist_at_festivals').insert({
          id: 5,
          festival_id: 10,
          artist_id: 1
        }),
        knex('artist_at_festivals').insert({
          id: 6,
          festival_id: 12,
          artist_id: 1
        }),
        knex('artist_at_festivals').insert({
          id: 7,
          festival_id: 1,
          artist_id: 2
        }),
        knex('artist_at_festivals').insert({
          id: 8,
          festival_id: 3,
          artist_id: 2
        }),
        knex('artist_at_festivals').insert({
          id: 9,
          festival_id: 7,
          artist_id: 3
        }),
        knex('artist_at_festivals').insert({
          id: 10,
          festival_id: 12,
          artist_id: 3
        }),
        knex('artist_at_festivals').insert({
          id: 11,
          festival_id: 3,
          artist_id: 3
        }),
        knex('artist_at_festivals').insert({
          id: 12,
          festival_id: 3,
          artist_id: 4
        }),
        knex('artist_at_festivals').insert({
          id: 13,
          festival_id: 1,
          artist_id: 4
        }),
        knex('artist_at_festivals').insert({
          id: 14,
          festival_id: 6,
          artist_id: 4
        }),
        knex('artist_at_festivals').insert({
          id: 15,
          festival_id: 10,
          artist_id: 4
        }),
        knex('artist_at_festivals').insert({
          id: 16,
          festival_id: 7,
          artist_id: 5
        }),
        knex('artist_at_festivals').insert({
          id: 17,
          festival_id: 2,
          artist_id: 5
        }),
        knex('artist_at_festivals').insert({
          id: 18,
          festival_id: 1,
          artist_id: 6
        })
      ]);
    });
};
