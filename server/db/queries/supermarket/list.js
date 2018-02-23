module.exports = knex => () =>
  knex('supermarket')
    .select()
    .then(geocodes => geocodes.map(geocode => new EntityGeocode(geocode)));
