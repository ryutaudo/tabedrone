module.exports = knex => (params) => {
  // validation
  if (!params || params.address === '') {
    throw new Error('please add a address');
  }
  if (!params || params.longitude === '') {
    throw new Error('please add a longitude');
  }
  if (!params || params.latitude === '') {
    throw new Error('please add a latitude');
  }

  // update db-data
  return knex('order_products')
    .update({ address: params.address })
    .where({ longitude: params.longitude, latitude: params.latitude })
    .then(() =>
      knex('order_products')
        .where({ latitude: params.latitude, longitude: params.longitude })
        .select()
        .then(rawDbData => new EntityGeocode(rawDbData)));
};
