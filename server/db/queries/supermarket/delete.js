module.exports = knex =>
  /**
   * @param object params
   */
  (params) => knex('supermarket')
      .where('id', params.id)
      .del()
      .then(() => ({ status: 'successfull' }));
