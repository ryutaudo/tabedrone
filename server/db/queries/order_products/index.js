module.exports = knex => ({
  create: require('./create')(knex),
  update: require('./update')(knex),
  get: require('./get')(knex),
});
