module.exports = knex =>
  /**
   * @param object params
   */
  params => knex('product')
    .where('id', params.id)
    .del()
    .then(() => ({ status: 'successfull' }));
