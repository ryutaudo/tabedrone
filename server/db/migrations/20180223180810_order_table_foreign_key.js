exports.up = knex => knex.schema.table(
  'order_products',
  table => table.foreign('order_id').references('order.id'),
);

exports.down = knex => knex('order_products').dropForeign('order_id');
