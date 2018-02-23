exports.up = knex => knex.schema.createTable(
  'product',
  (table) => {
    table.increments()
      .index();

    table.foreign('id').references('fridge_inventory.product_id');

    table.foreign('id').references('order_products.product_id');

    table.text('name')
      .notNullable();
  },
);

exports.down = knex => knex.schema.dropTable('product');

