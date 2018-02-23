module.exports = knex => () =>
  knex('order_products')
    .select()
    .then(data => data);
