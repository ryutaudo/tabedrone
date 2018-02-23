module.exports = knex => (params) => {
  // address exists?
  if (!params || params.address === '') {
    throw new Error('please add a address');
  }

  // error-handling
  if (json.results.length === 0) {
    throw Error(`no geocode found for the address ${params.address}`);
  }
  if (json.results.length > 1) {
    throw Error(`address is not unique enough. found more geocodes for ${params.address}`);
  }
  if (json.status !== 'OK') {
    throw Error(json.status);
  }
  const singleGeocode = json.results[0];

  const data = {
    latitude: singleGeocode.geometry.location.lat,
    longitude: singleGeocode.geometry.location.lng,
    address: params.address,
  };
  return knex('order').insert(data).then(() => new EntityGeocode(data));
};
