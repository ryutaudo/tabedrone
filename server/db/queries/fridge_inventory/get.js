module.exports = async knex =>
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

    return knex('fridge_inventory')
      .where({ customer_id: params.customer_id })
      .select()
      .then(dbRawData => dbRawData);
  };

