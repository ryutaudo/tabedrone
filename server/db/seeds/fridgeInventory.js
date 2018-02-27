// export the seed
exports.seed = knex => knex('fridge_inventory').insert([
  { product_id: 1, amount: 2, customer_id: 1 },
]);
