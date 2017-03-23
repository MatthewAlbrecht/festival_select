exports.seed = function(knex, Promise) {
  return knex('festivals').del()
    .then(() => {
      return Promise.all([
        knex('festivals').insert({
          id: 1,
          name: 'bonnaroo'
        }),
        knex('festivals').insert({
          id: 2,
          name: 'coachella'
        }),
        knex('festivals').insert({
          id: 3,
          name: 'firefly'
        }),
        knex('festivals').insert({
          id: 4,
          name: 'boston calling'
        }),
        knex('festivals').insert({
          id: 5,
          name: 'electric forest w1'
        }),
        knex('festivals').insert({
          id: 6,
          name: 'electric forest w2'
        }),
        knex('festivals').insert({
          id: 7,
          name: 'sasquatch'
        }),
        knex('festivals').insert({
          id: 8,
          name: 'shaky knees'
        }),
        knex('festivals').insert({
          id: 9,
          name: 'shaky beats'
        }),
        knex('festivals').insert({
          id: 10,
          name: 'governors ball'
        }),
        knex('festivals').insert({
          id: 11,
          name: 'mysteryland'
        }),
        knex('festivals').insert({
          id: 12,
          name: 'hangout'
        })
      ]);
    });
};
