module.exports = knex => (params) => {
  // error validation
  if (!params) {
    throw new Error('please add object');
  }
  if (params.status === '') {
    throw new Error('please add the status');
  }
  if (params.id === '') {
    throw new Error('please add the id');
  }

  // update db-data
  return knex('order')
    .update({ status: params.status })
    .where({ id: params.id });
};
