module.exports = knex => (params) => {
  // error validation
  if (!params) {
    throw new Error('please add object');
  }
  if (params.product_id === '') {
    throw new Error('please add the product_id');
  }
  if (params.amount === '') {
    throw new Error('please add the amount');
  }
  if (params.customer_id === '') {
    throw new Error('please add the customer_id');
  }

  return knex('fridge_inventory').insert(params);
};
