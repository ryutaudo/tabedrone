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
    console.log("use-product endpt", request.body.customerId);
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
   * 
   * 1. decrease amount from fridge query
   * 2. return status
   */


  // 1. loading customer id from geocode
  // 2. loading all supermarkets from db
  // 3. finding nearest supermarket id closest to customer  
  // 4. saving the cart products
  // 5. increase of amount in fridge_inventory
  // 6. new created orderid  

  // console.log("post orders is:", db.order.create);
  // from Christian's github https://github.com/ChristianSchmidt1981/meetup-02-21-2018/blob/master/distance-with-curvature.js
  function getDistance(geocodeA, geocodeB) {
    // point 1
    const between2parallels = 111.3; // unit: km
    const between2meridians = 71.5; // unit: km

    const rad = 0.01745; // 1° = π/180 rad ≈ 0.01745
    const lat = (geocodeA.latitude - geocodeB.latitude) / 2 * rad;

    // point 2
    const dx = between2meridians * Math.cos(lat) * (geocodeA.longitude - geocodeB.longitude);
    const dy = between2parallels * (geocodeA.latitude - geocodeB.latitude);

    // point 3
    return Math.sqrt((dx * dx) + (dy * dy));
  }
  try {
    // point 1
    const geocodeFromCustomer = await db.customer.get({
      latitude: +request.params.latitude,
      long: +request.params.longitude,
    });
    const geocodeFromSupermarket = await db.customer.get({
      latitude: +request.params.latitude,
      long: +request.params.longitude,
    });

    // point 2
    const distanceInCentimeter = getDistance(
      geocodeFromCustomer,
      geocodeFromSupermarket,
    );

    // point 3
    console.log(distanceInCentimeter);

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
