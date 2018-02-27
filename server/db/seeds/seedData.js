exports.seed = knex => knex('order').del()
  .then(() => knex('order').insert([
    {
      id: 1,
      product_id: 1,
      customer_id: 1,
      status: 'OPEN',
    },
  ]));

