module.exports = async knex =>
  /**
   * @param object params
   */
  (params) => {
    // error validation
    if (!params) {
      throw new Error('please add object');
    }
    if (params.id === '' || params.id === undefined) {
      throw new Error('please add the id');
    }
    if (!Number.isInteger(params.id)) {
      throw new Error('id should be a number');
    }
    if (params.id <= 0) {
      throw new Error('number-value in the property id should be greater 0');
    }

    return knex('product')
      .where({ id: params.id })
      .select()
      .then((dbRawData) => {
        // return one product object
        if (dbRawData.length === 1) {
          return dbRawData[0];
        }

        throw new Error(`Error finding product with the id ${params.id}`);
      });
  };
