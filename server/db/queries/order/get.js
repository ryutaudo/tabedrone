module.exports = async knex =>
  /**
   * @param object params
   */
  (params) => {
    // error validation
    if (!params) {
      throw new Error('please add object');
    }
    if (params.id === '') {
      throw new Error('please add the id');
    }

    return knex('order')
      .where({ id: params.id })
      .select()
      .then((dbRawData) => {
        if (dbRawData.length === 1) {
          return dbRawData[0];
        }

        throw new Error(`Error finding order id:${params.id}`);
      });
  };
