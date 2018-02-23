module.exports = knex =>
  /**
   * @param object params
   */
  (params) => {
    return knex('supermarket')
      .where('id', params.id)
      .del()
      .then(() => ({ status: 'successfull' }));
  };
