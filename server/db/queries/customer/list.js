module.exports = knex => () =>
  knex('customer')
    .select();
