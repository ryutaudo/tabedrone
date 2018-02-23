module.exports = knex => (params) => {
  // validation
  if (!params) {
    throw new Error('please add the params object');
  }
    if ( params.id === '') {
        throw new Error('please add the id');
    }
    if ( params.name === '') {
        throw new Error('please add the name');
    }
  if (params.longitude === '' || params.latitude === '') {
    throw new Error('please add the geocode');
  }

  // update db-data
  return knex('supermarket')
    .update({ longitude: params.longitude, latitude: params.latitude, name: params.name })
    .where({ id: params.id });
};
