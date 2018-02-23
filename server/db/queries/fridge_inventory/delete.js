module.exports = knex =>
  /**
   * @param object params
   */
  (params) => {
    return knex('fridge_inventory')
      .where('id', params.id)
      .del()
      .then(() => ({ status: 'successfull' }));
  };
