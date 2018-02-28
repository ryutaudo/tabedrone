module.exports = knex =>
  /**
   * @param object params
   */
  async (params) => {
    const dbCustList = await knex('fridge_inventory')
      .select('product.id', 'product.name', 'fridge_inventory.amount')
      .join('product', 'product.id', 'fridge_inventory.product_id')
      .where('customer_id', params)
      .then(dbRawData => dbRawData);

    return dbCustList;
  };

