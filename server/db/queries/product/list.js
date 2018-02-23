module.exports = knex => () =>
  knex('product')
    .select()
    .then(product => product);
