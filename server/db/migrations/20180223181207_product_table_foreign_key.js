exports.up = knex => knex.schema.table(
  'fridge_inventory',
  table => table.foreign('product_id').references('product_id'),
);

exports.down = knex => knex('fridge_inventory').dropForeign('product_id');
