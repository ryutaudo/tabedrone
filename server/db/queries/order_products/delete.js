module.exports = knex =>
  /**
   * @param object params
   */
  params => knex('order_products')
    .where('id', params.id)
    .del()
    .then(() => ({ status: 'successfull' }));
