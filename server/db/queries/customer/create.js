module.exports = knex => (params) => {
  // validation
  if (!params) {
    throw new Error('please add the params object');
  }
  if (params.id === '') {
    throw new Error('please add the id');
  }
  if (params.name === '') {
    throw new Error('please add the name');
  }
  if (params.longitude === '' || params.latitude === '') {
    throw new Error('please add the geocode');
  }


  return knex('customer').insert(params);
};
