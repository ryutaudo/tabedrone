module.exports = knex => (params) => {
  // error validation
  if (!params) {
    throw new Error('please add object');
  }
  if (params.name === '') {
    throw new Error('please add the name');
  }

  // update db-data
  return knex('product')
    .update({ name: params.name })
    .where({ id: params.id });
};
