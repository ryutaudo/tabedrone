module.exports = knex => (params) => {
  // validation
  // console.log('order_products params outputs to: ', params, params[0]);
  if (!params) {
    throw new Error('please add the params object');
  }

  knex('order_products').del();
  const storeSingleRow = (orderProducts) => {
    //console.log("order_products params ou ", orderProducts);
    if (orderProducts.order_id === '' || orderProducts.order_id === undefined) {
      throw new Error('please add the order_id');
    }
    if (!Number.isInteger(orderProducts.order_id)) {
      throw new Error('order_id should be a number');
    }
    if (orderProducts.order_id <= 0) {
      throw new Error('number-value in the property order_id should be greater 0');
    }
    if (orderProducts.product_id === '' || orderProducts.product_id === undefined) {
      throw new Error('please add the product_id');
    }
    if (!Number.isInteger(orderProducts.product_id)) {
      throw new Error('product_id should be a number');
    }
    if (orderProducts.product_id <= 0) {
      throw new Error('number-value in the property product_id should be greater 0');
    }
    if (orderProducts.amount === '' || orderProducts.amount === undefined) {
      throw new Error('please add the amount');
    }
    if (!Number.isInteger(orderProducts.amount)) {
      throw new Error('amount should be a number');
    }
    if (orderProducts.amount <= 0) {
      throw new Error('number-value in the property amount should be greater 0');
    }

    return knex('order_products')
      .insert({
        product_id: orderProducts.product_id,
        amount: orderProducts.amount,
        order_id: orderProducts.order_id,
      })
      .then(data => data);
  };
  params.forEach((orderProducts) => {
    orderProducts.then(product => storeSingleRow(product));
  });
};
