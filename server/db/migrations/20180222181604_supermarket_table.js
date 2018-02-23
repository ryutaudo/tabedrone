exports.up = knex => knex.schema.createTable(
  'supermarket',
  (table) => {
    table.increments()
      .index();

    table.foreign('id').references('order.supermarket_id').unsigned();

    table.text('name')
      .notNullable();

    table.float('latitude').notNullable();

    table.float('longitude').notNullable();
  },
);

exports.down = knex => knex.schema.dropTable('supermarket');
