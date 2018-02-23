module.exports = knex => (params) => {
  // error validation
  if (!params) {
    throw new Error('please add object');
  }
  if (params.status === '') {
    throw new Error('please add the status');
  }
  if (params.supermarket_id === '') {
    throw new Error('please add the supermarket_id');
  }
  if (params.customer_id === '') {
    throw new Error('please add the customer_id');
  }

  return knex('order').insert(params);
};
