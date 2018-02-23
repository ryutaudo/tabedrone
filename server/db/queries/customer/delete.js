module.exports = knex =>
  /**
   * @param object params
   */
  params => knex('customer')
    .where('id', params.id)
    .del()
    .then(() => ({ status: 'successfull' }));
