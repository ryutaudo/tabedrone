module.exports = knex => ({
  create: require('./create')(knex),
  update: require('./update')(knex),
  delete: require('./delete')(knex),
  getAllProducts: require('./getAllProducts')(knex),
  getCustomerId: require('./getCustomerId')(knex),
  getNewOrder: require('./getNewOrder')(knex),
  list: require('./list')(knex),
  get: require('./get')(knex),
});
