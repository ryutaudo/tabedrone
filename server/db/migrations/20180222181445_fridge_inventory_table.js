exports.up = knex => knex.schema.createTable(
  'fridge_inventory',
  (table) => {
    table.increments()
      .index();

    table.integer('product_id').notNullable().unsigned();

    table.integer('amount').notNullable().unsigned();

    table.integer('customer_id').notNullable().unsigned();
  },
);


exports.down = knex => knex.schema.dropTable('fridge_inventory');
