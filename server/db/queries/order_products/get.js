module.exports = async knex =>
  /**
   * @param object params
   */
  (params) => {
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

    return knex('order_products')
      .where({ order_id: params.order_id })
      .select()
      .then(dbRawData => dbRawData);
  };
