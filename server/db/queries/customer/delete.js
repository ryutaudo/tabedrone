module.exports = knex =>
  /**
   * @param object params
   */
  (params) => {
    // validation
    if (!params) {
      throw new Error('please add the params object');
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
    return knex('customer')
      .where('id', params.id)
      .del()
      .then(() => ({ status: 'successfull' }));
  };
