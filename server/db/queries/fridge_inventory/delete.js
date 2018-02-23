module.exports = knex =>
  /**
   * @param object params
   */
  (params) => {
    // error validation
    if (!params) {
      throw new Error('please add object');
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
    if (params.product_id === '' || params.product_id === undefined) {
      throw new Error('please add the product_id');
    }
    if (!Number.isInteger(params.product_id)) {
      throw new Error('product_id should be a number');
    }
    if (params.product_id <= 0) {
      throw new Error('number-value in the property product_id should be greater 0');
    }

    const data = {
      customer_id: params.customer_id,
      product_id: params.product_id,
    };

    return knex('fridge_inventory')
      .where(data)
      .del()
      .then(() => ({ status: 'successfull' }));
  };
