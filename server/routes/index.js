const express = require('express');

const router = express.Router();
const db = require('../db/index');

// tasks to do, Sat Feb 24, 2018
// comment out response.json mock data
// connect queries to the 3 endpoints below (database to front end)
// test if front end gets data using postman on http://localhost:3000/api/...

/* GET fridge-content */
router.get('/fridge-contents/:customerId', async (request, response) => {
  try {
    const fridgeContents = await db.fridge_inventory.get({
      customer_id: +request.params.customerId,
    });
    response.json(fridgeContents);
  } catch (error) {
    response.status(error).send(500);
  }
});
/**
  response.json([
    {
      id: 1, // customer based unique auto-increment. start: 1
      name: 'apple',
      amount: 3,
    },
    {
      id: 2, // customer based unique auto-increment. start: 1
      name: 'orange',
      amount: 5,
    },
    {
      id: 3, // customer based unique auto-increment. start: 1
      name: 'milk',
      amount: 2,
    },
    {
      id: 4, // customer based unique auto-increment. start: 1
      name: 'wine',
      amount: 0,
    },
  ]);
  */

/* POST order */
router.post('/use-product', async (request, response) => {
  /**
   * @todo get customerId + cart = {[name: 'x', amount: - 1]}
   * fridge content should be reduced by this amount
   */
  response.send(500, 'please implement');
});

/* POST order */
router.post('/order', async (request, response) => {
  /**
   * is inside the request.
   * customerId: 1
   * cart: [{name: 'apple', amount: 4}, {...}]
   */
  try {
    // @todo
    const supermarketId = 1;

    const orders = await db.order
      .create({
        customer_id: request.body.customerId,
        status: 'OPEN',
        supermarket_id: supermarketId,
      }).into('order');
    response.send(orders);
  } catch (error) {
    response.send(500, error);
  }
});
/*
  response.json({
    orderId: 1,
    customerId: 1,
    status: 'OPEN',
  });
*/

/* GET order */
router.get('/orders/:orderId', async (request, response) => {
  try {
    const orderId = +request.params.orderId;
    const orderInfo = await db.order.get({ order_id: orderId });
    const cart = db.order_products.get({ order_id: orderId });

    response.json({
      orderId: orderInfo.order_id,
      status: orderInfo.status,
      cart,
    });
  } catch (error) {
    response.status(error).send(500);
  }
});

module.exports = router;
