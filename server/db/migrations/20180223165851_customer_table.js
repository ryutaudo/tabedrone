exports.up = knex => knex.schema.createTable(
  'customer',
  (table) => {
    table.increments()
      .index();

    // table.foreign('id').references('fridge_inventory.customer_id');
    // table.foreign('id').references('order.customer_id');

    table.text('name')
      .notNullable();

    table.float('latitude').notNullable();

    table.float('longitude').notNullable();
  },
);


exports.down = knex => knex.schema.dropTable('customer');
