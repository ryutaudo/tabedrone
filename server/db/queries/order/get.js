module.exports = async knex =>
  /**
   * @param object params
   */
  params =>
    knex('order')
      .where({ order_id: params.order_id })
      .select()
      .then((dbRawData) => {
        if (dbRawData.length === 1) {
          return dbRawData[0];
        }

        throw new Error(`Error finding order lat:${params.order_id}`);
      });
