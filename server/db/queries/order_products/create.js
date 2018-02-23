module.exports = knex => (params) => {
    // error validation
    if (!params) {
        throw new Error('please add object');
    }
    if (params.name === '') {
        throw new Error('please add the name');
    }
    if (params.latitude === '' || params.longitude === '') {
        throw new Error('please add the geocode');
    }

  return knex('order_products').insert(params);
};
