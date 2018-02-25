module.exports = knex => ({
  create: require('./create')(knex),
  update: require('./update')(knex),
  delete: require('./delete')(knex),
  list: require('./list')(knex),
  get: require('./get')(knex),
});
