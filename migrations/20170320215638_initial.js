exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('artists', table => {
      table.increments('id')
        .primary()

      table.text('name')
        .notNullable()
    }),
    knex.schema.createTable('festivals', table => {
      table.increments('id')
        .primary()

      table.text('name')
        .notNullable()
    }),
    knex.schema.createTable('artist_at_festivals', table => {
      table.increments('id')
        .primary()

      table.integer('festival_id')
        .references('id')
        .inTable('festivals')
        .notNullable()
      table.integer('artist_id')
        .references('id')
        .inTable('artists')
        .notNullable()
    }),
    knex.schema.alterTable('artists', t => {
      t.unique('name')
    }),
    knex.schema.alterTable('festivals', t => {
      t.unique('name')
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('artists'),
    knex.schema.dropTable('festivals'),
    knex.schema.dropTable('artist_at_festivals'),
  ])
};
