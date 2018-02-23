module.exports = knex => (params) => {
  // error validation
  if (!params) {
    throw new Error('please add object');
  }
  if (params.status === '') {
    throw new Error('please add the status');
  }
  // @todo create a function with duplicate code form create.js
  if (params.status !== 'OPEN' && params.status !== 'DONE') {
    throw new Error('status has a wrong value');
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

  // update db-data
  return knex('order')
    .update({ status: params.status })
    .where({ id: params.id });
};
