module.exports = knex => (params) => {
  // error validation
  if (!params) {
    throw new Error('please add object');
  }
  if (params.status === '') {
    throw new Error('please add the status');
  }
  // @todo create a function with duplicate code form update.js
  if (params.status !== 'OPEN' && params.status !== 'DONE') {
    throw new Error('status has a wrong value');
  }
  if (params.supermarket_id === '' || params.supermarket_id === undefined) {
    throw new Error('please add the supermarket_id');
  }
  if (!Number.isInteger(params.supermarket_id)) {
    throw new Error('supermarket_id should be a number');
  }
  if (params.supermarket_id <= 0) {
    throw new Error('number-value in the property supermarket_id should be greater 0');
  }
  if (params.customer_id === '' || params.customer_id === undefined) {
    throw new Error('please add the customer_id');
  }
  if (!Number.isInteger(params.customer_id)) {
    throw new Error('customer_id should be a number');
  }
  if (params.customer_id <= 0) {
    throw new Error('number-value in the property customer_id should be greater 0');
  }

  return knex('order').insert(params);
};
