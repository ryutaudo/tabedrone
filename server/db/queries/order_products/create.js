module.exports = knex => (params) => {
  // validation
  if (!params) {
    throw new Error('please add the params object');
  }
  if (params.order_id === '') {
    throw new Error('please add the order_id');
  }
  if (params.product_id === '') {
    throw new Error('please add the product_id');
  }
  if (params.amount === '') {
    throw new Error('please add the amount');
  }

  return knex('order_products').insert(params);
};
