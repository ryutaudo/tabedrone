module.exports = knex => (params) => {
  // validation
  if (!params) {
    throw new Error('please add the params object');
  }
  if (params.id === '' || params.id === undefined) {
    throw new Error('please add the id');
  }
  if (!Number.isInteger(params.id)) {
    throw new Error('id should be a number');
  }
  if (params.id <= 0) {
    throw new Error('number-value in the property id should be greater 0');
  }
  if (params.name === '') {
    throw new Error('please add the name');
  }
  if (params.longitude === '' || params.latitude === '') {
    throw new Error('please add the geocode');
  }

  const data = {
    longitude: params.longitude,
    latitude: params.latitude,
    name: params.name,
  };

  // update db-data
  return knex('customer')
    .update(data)
    .where({ id: params.id });
};
