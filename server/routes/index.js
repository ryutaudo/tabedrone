const Order = require('./util/order');
const express = require('express');

const router = express.Router();
const db = require('../db/index');

/* GET fridge-content */
router.get('/fridge-contents/:customerId', async (request, response) => {
  try {
    const fridgeContents = await db.fridge_inventory.getCustomerId(request.params.customerId);
    response.json({
      customerId: fridgeContents[0].id,
      name: fridgeContents[0].name,
      amount: fridgeContents[0].amount,
    });
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
   * get customerId + cart = {[name: 'x', amount: - 1]}
   * request {
     "customerId": "1",
    "cart": [{"name": "5", "amount": "1"}]
    }
   * fridge content should be reduced by this amount
   */
  try {
    console.log('use-product endpt', request.body);
    db.fridge_inventory.getAllProducts(request.body.customerId, request.body.cart);

    response.json({
      customerId: request.body.customerId,
      status: 'successful',
    });
  } catch (error) {
    response.status(error).send(500);
  }
});

/* POST order */
router.post('/order', async (request, response) => {
  /**
   * is inside the request.
   * customerId: 1
   * cart: [{name: 'apple', amount: 4}, {...}]
    {
     "customerId": "3",
    "cart": [{"name": "kyoko", "amount": "3"}]
    }
   */

  try {
    // console.log('reqqqqq++ ', request.body);

    // order store method {customerId: 1, status:"OPEN", carts:[{productId:1, amount:1, orderId:1}]}
    const order = new Order();
    const orderStoredId = order.store({
      customerId: +request.body.customerId,
      status: 'OPEN',
      cart: request.body.cart,
    });
    response.json({
      orderId: orderStoredId,
      customerId: request.body.customerId,
      status: 'successful',
    });
    // response.send(request.body.order);
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
  /*

  */

  try {
    const orderId = +request.params.orderId;
    const orderInfo = await db.order.get({ order_id: orderId });
    const cart = await db.order_products.get({ order_id: orderId });
    console.log('order Id is ~~~~~', orderId, orderInfo, cart);


    response.json({
      orderId: orderInfo.id,
      status: orderInfo.status,
      cart,
    });
  } catch (error) {
    response.status(error).send(500);
  }
});

module.exports = router;
