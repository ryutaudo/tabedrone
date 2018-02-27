exports.up = knex => knex.schema.table(
  'order_products',
  table => table.foreign('order_id').references('product_id'),
);

exports.down = knex => knex.schema.table('order_products').dropForeign('order_id');
