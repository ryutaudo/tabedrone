module.exports = knex => () =>
  knex('fridge_inventory')
    .select()
    .then(data => data);
