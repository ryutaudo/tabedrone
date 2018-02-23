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

  // update db-data
  return knex('order_products')
    .update({ amount: params.amount })
    .where({ order_id: params.order_id, product_id: params.product_id });
};
