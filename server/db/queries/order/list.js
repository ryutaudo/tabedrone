module.exports = knex => () =>
  knex('order')
    .select();
