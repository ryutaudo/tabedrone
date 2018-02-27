exports.up = (knex) => {
  
  
  knex.schema.table(
    'fridge_inventory',
    (table) => {
      table.dropForeign('product_id');
      table.foreign('product_id').references('product.id')
    },
  );
};

exports.down = knex => knex.schema.table(
  'fridge_inventory',
  table => table.dropForeign('product_id')
);