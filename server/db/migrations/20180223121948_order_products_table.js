exports.up = knex => knex.schema.createTable(
  'order_products',
  (table) => {
    table.increments()
      .index();

    table.integer('product_id').notNullable().unsigned();
    
    table.foreign('product_id').references('product.id');

    table.integer('amount').notNullable().unsigned();

    table.integer('order_id').notNullable().unsigned();

    table.foreign('order_id').references('order.id');
  },
);

exports.down = knex => knex.schema.dropTable('order_products');
