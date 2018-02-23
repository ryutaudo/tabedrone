exports.up = knex => knex.schema.createTable(
  'order',
  (table) => {
    table.increments()
      .index();

    table.foreign('id').references('order_products.order_id');
    table.integer('customer_id').unsigned();

    table.text('status')
      .notNullable();

    table.integer('supermarket_id').unsigned();
  },
);

exports.down = knex => knex.schema.dropTable('order');
