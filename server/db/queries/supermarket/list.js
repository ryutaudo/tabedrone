module.exports = knex =>
  () => knex('supermarket')
    .select()
    .then(data => data);
