module.exports = knex =>
  /**
   * @param object params
   */
  (customerId, productList) => {
    productList.forEach(async (requestProduct) => {
      const dbProduct = await knex('fridge_inventory')
        .select('fridge_inventory.amount', 'product.id')
        .join('product', 'product.id', 'fridge_inventory.product_id')
        .where({
          'fridge_inventory.customer_id': customerId,
          name: requestProduct.name,
        });

      knex('fridge_inventory')
        .where({
          customer_id: +customerId,
          product_id: dbProduct[0].id,
        })
        .update({ amount: dbProduct[0].amount + (requestProduct.amount * -1) })
        .then(dbRawData => dbRawData);
    });

    return { status: 'successful' };
  };

