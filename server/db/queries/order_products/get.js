module.exports = async knex =>
  /**
   * @param object params
   */
  params =>
    knex('order_products')
      .where({ order_id: params.order_id })
      .select()
      .then(dbRawData => dbRawData);
