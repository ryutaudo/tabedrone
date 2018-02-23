module.exports = knex =>
  /**
   * @param object params
   */
  (params) => {
    // error validation
    if (!params) {
      throw new Error('please add object');
    }
    if (params.customer_id === '') {
      throw new Error('please add the customer_id');
    }
    if (params.product_id === '') {
      throw new Error('please add the product_id');
    }

    return knex('fridge_inventory')
      .where({ customer_id: params.customer_id, product_id: params.product_id })
      .del()
      .then(() => ({ status: 'successfull' }));
  };
