module.exports = knex => () =>
  knex('supermarket')
    .select();
