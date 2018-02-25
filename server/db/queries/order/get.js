module.exports = knex =>
  /**
   * @param object params
   */
  (params) => {
    console.log("get order ", params);
    // error validation
    if (!params) {
      throw new Error('please add object');
    }
    if (params.order_id === '' || params.order_id === undefined) {
      throw new Error('please add the id');
    }
    if (!Number.isInteger(params.order_id)) {
      throw new Error('id should be a number');
    }
    if (params.id <= 0) {
      throw new Error('number-value in the property id should be greater 0');
    }

    return knex('order')
      .where({ id: params.order_id })
      .select()
      .then((dbRawData) => {
        // return one order-object
        if (dbRawData.length === 1) {
          return dbRawData[0];
        }

        throw new Error(`Error finding order id:${params.id}`);
      });
  };
