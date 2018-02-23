module.exports = knex => () =>
  knex('order')
    .select()
    .then(data => data);
