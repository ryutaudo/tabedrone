const getDistance = require('./util/index');

// const geocodeFromRoppongiHills = { latitude: 35.6817124, longitude: 139.7166117 };
// const geocodeFromAkihabara = { latitude: 35.7022077, longitude: 139.7722703 };

// // point 2
// const distanceInCentimeter = getDistance (
//      geocodeFromRoppongiHills,
//      geocodeFromAkihabara
// );

// // point 3
// console.log("cm distance is:::: ", distanceInCentimeter);

// console.log("get distance", getDistance())
const express = require('express');

const router = express.Router();
const db = require('../db/index');

/* GET fridge-content */
router.get('/fridge-contents/:customerId', async (request, response) => {
  try {
    // const fridgeContents = await db.fridge_inventory.getCustomerId(request.params.customerId);
    // response.json({
    //   customerId: fridgeContents[0].id,
    //   name: fridgeContents[0].name,
    //   amount: fridgeContents[0].amount,
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
    // });
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
    {
     "customerId": "3",
    "cart": [{"name": "kyoko", "amount": "3"}]
    }
   */

  // 1. loading customer id from geocode
  // 2. loading all supermarkets from db
  // 3. finding nearest supermarket id closest to customer  
  // 4. saving the cart products
  // 5. increase of amount in fridge_inventory
  // 6. new created orderid  

  try {
    const customerId = +request.body.customerId;  //3
    const customerInfo = await db.customer.get({ id: customerId });
    const supermarketInfo = +await db.supermarket.list();
     const cartInput = request.body.cart;
     const fridgeInv = db.fridge_inventory.getAllProducts(customerId, cartInput);

    console.log( "reqqqqq------", customerId, customerInfo, customerInfo.latitude, cartInput, fridgeInv);
    console.log( "reqqqqq++ ", supermarketInfo);
    // point 1
    const geocodeFromCustomer = await db.customer.get({
      latitude: +request.body.latitude,
      long: +request.body.longitude,
    });

    // loop over supermarket geocodes
      //check if customer geocode equals or is close to a supermarket geocode

      /*
      exact match
      y = 6;
      arr = [1,2,6,11];
      for (i=0;i<arr.length;i++){
        if(y===arr[i]){
          return arr[i];
          }
      }      
        */
    const geocodeFromSupermarket = await db.customer.get({
      latitude: +request.body.latitude,
      long: +request.body.longitude,
    });
      console.log('get distance is: ', getDistance(
        geocodeFromCustomer,
        geocodeFromSupermarket,
      ));
    
    
    // point 2
    const distanceInCentimeter = getDistance(
      geocodeFromCustomer,
      geocodeFromSupermarket,
    );

    // point 3
   console.log("distaince in cM is: ", geocodeFromCustomer, geocodeFromSupermarket, distanceInCentimeter);

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
  /*

  */
  
  try {

    const orderId = +request.params.orderId;
    const orderInfo = await db.order.get({ order_id: orderId });
    const cart = await db.order_products.get({ order_id: orderId });
    console.log("order Id is ~~~~~", orderId, orderInfo, cart);


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
