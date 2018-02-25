exports.up = knex => knex.schema.table(
  'order',
  table => table.foreign('supermarket_id').references('supermarket.id'),
);

exports.down = knex => knex('order').dropForeign('supermarket_id');
