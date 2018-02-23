module.exports = knex => ({
  create: require('./create')(knex),
  update: require('./update')(knex),
  list: require('./list')(knex),
  get: require('./get')(knex),
});
