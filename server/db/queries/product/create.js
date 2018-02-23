module.exports = knex => (params) => {
  // error validation
  if (!params) {
    throw new Error('please add object');
  }
  if (params.name === '') {
    throw new Error('please add the name');
  }

  return knex('product').insert(params);
};
