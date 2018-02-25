module.exports = knex => (params) => {
  // validation
  if (!params) {
    throw new Error('please add the params object');
  }
  if (params.order_id === '' || params.order_id === undefined) {
    throw new Error('please add the order_id');
  }
  if (!Number.isInteger(params.order_id)) {
    throw new Error('order_id should be a number');
  }
  if (params.order_id <= 0) {
    throw new Error('number-value in the property order_id should be greater 0');
  }
  if (params.product_id === '' || params.product_id === undefined) {
    throw new Error('please add the product_id');
  }
  if (!Number.isInteger(params.product_id)) {
    throw new Error('product_id should be a number');
  }
  if (params.product_id <= 0) {
    throw new Error('number-value in the property product_id should be greater 0');
  }
  if (params.amount === '' || params.amount === undefined) {
    throw new Error('please add the amount');
  }
  if (!Number.isInteger(params.amount)) {
    throw new Error('amount should be a number');
  }
  if (params.amount <= 0) {
    throw new Error('number-value in the property amount should be greater 0');
  }

  // update db-data
  return knex('order_products')
    .update({ amount: params.amount })
    .where({
      order_id: params.order_id,
      product_id: params.product_id,
    });
};
