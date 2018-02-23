module.exports = async knex =>
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

    return knex('fridge_inventory')
      .where({ customer_id: params.customer_id })
      .select()
      .then(dbRawData => dbRawData);
  };

