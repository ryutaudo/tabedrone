module.exports = knex => (params) => {
  // error validation
  if (!params) {
    throw new Error('please add object');
  }
  if (params.customer_id === '') {
    throw new Error('please add the customer_id');
  }
  if (params.amount === '') {
    throw new Error('please add the amount');
  }
  if (params.product_id === '') {
    throw new Error('please add the product_id');
  }
  // update db-data
  return knex('fridge_inventory')
    .update({ amount: params.amount })
    .where({ customer_id: params.customer_id, product_id: params.product_id });
};
